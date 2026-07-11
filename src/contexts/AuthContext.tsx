import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../firebase";
import {
  getUserProfile,
  setUserProfile,
  updateUserProfile,
  updateAllUserPicksUsername,
  addLeagueToProfile,
  removeLeagueFromProfile,
  UserProfile,
  SavedLeague,
} from "../utils/survivorUtils";
import { getSleeperUserByUsername } from "../utils/api/SleeperAPI";
import {
  discoverSleeperLeagues,
  mergeSleeperLeagues,
  refreshSleeperLeagues,
} from "../utils/sleeperLeagueSync";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  profile: UserProfile | null;
  loadingProfile: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  /** User's saved leagues from Firestore */
  savedLeagues: SavedLeague[];
  /** Add a league to the user's saved leagues */
  addLeague: (league: SavedLeague) => Promise<void>;
  /** Remove a league from the user's saved leagues */
  removeLeague: (leagueId: string) => Promise<void>;
  /** Link a Sleeper account by username. Also saves the user's current-season leagues. */
  linkSleeper: (username: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savedLeagues, setSavedLeagues] = useState<SavedLeague[]>([]);
  const auth = getAuth(app);

  const loadProfile = useCallback(
    async (userId: string): Promise<UserProfile | null> => {
      setLoadingProfile(true);
      let userProfile = await getUserProfile(userId);
      const currentEmail = currentUser?.email || "";
      let loadedProfile: UserProfile | null = null;
      if (!userProfile && currentUser?.displayName) {
        // Create profile with Google display name and email if it doesn't exist
        const newProfile = {
          customDisplayName: currentUser.displayName,
          email: currentEmail,
        };
        await setUserProfile(userId, newProfile);
        setProfile(newProfile);
        setSavedLeagues([]);
        loadedProfile = newProfile;
      } else if (userProfile) {
        // Update existing profile if email is missing or different
        if (!userProfile.email || userProfile.email !== currentEmail) {
          const updatedProfile = { ...userProfile, email: currentEmail };
          await updateUserProfile(userId, { email: currentEmail });
          setProfile(updatedProfile);
          loadedProfile = updatedProfile;
        } else {
          setProfile(userProfile);
          loadedProfile = userProfile;
        }
        setSavedLeagues(userProfile.leagues ?? []);
      } else {
        setProfile(null);
        setSavedLeagues([]);
      }
      setLoadingProfile(false);
      return loadedProfile;
    },
    [currentUser?.displayName, currentUser?.email]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const loadedProfile = await loadProfile(user.uid);
        // Background sync of Sleeper leagues — fire-and-forget, additive only
        refreshSleeperLeagues(user.uid, loadedProfile).then((merged) => {
          if (merged) setSavedLeagues(merged);
        });
        setLoading(false);
      } else {
        setProfile(null);
        setSavedLeagues([]);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, loadProfile]);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setLoading(false);
    } catch (error) {
      console.error("Error signing in:", error);
      setLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!currentUser) return false;
    const success = await updateUserProfile(currentUser.uid, updates);
    if (success) {
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      // Update all existing picks with the new username
      if (updates.customDisplayName) {
        await updateAllUserPicksUsername(currentUser.uid, updates.customDisplayName);
      }
    }
    return success;
  };

  /**
   * Add a league to the user's saved leagues (Firestore + local state).
   */
  const addLeague = async (league: SavedLeague): Promise<void> => {
    if (!currentUser) return;
    const success = await addLeagueToProfile(currentUser.uid, league);
    if (success) {
      setSavedLeagues((prev) => {
        const filtered = prev.filter((l) => l.id !== league.id);
        return [...filtered, league];
      });
    }
  };

  /**
   * Remove a league from the user's saved leagues (Firestore + local state).
   */
  const removeLeague = async (leagueId: string): Promise<void> => {
    if (!currentUser) return;
    const success = await removeLeagueFromProfile(currentUser.uid, leagueId);
    if (success) {
      setSavedLeagues((prev) => prev.filter((l) => l.id !== leagueId));
    }
  };

  /**
   * Link a Sleeper account by username. Validates the username against the
   * Sleeper API, persists sleeperUserId/sleeperUsername to Firestore, and
   * auto-saves the user's leagues (current + previous season) to savedLeagues.
   */
  const linkSleeper = async (username: string): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: "Not signed in" };

    const sleeperUser = await getSleeperUserByUsername(username.trim());
    if (!sleeperUser) {
      return { success: false, error: `No Sleeper account found for "${username.trim()}"` };
    }

    const updates: Partial<UserProfile> = {
      sleeperUserId: sleeperUser.user_id,
      sleeperUsername: sleeperUser.username,
    };
    const ok = await updateUserProfile(currentUser.uid, updates);
    if (!ok) return { success: false, error: "Failed to save Sleeper account" };

    setProfile((prev) => (prev ? { ...prev, ...updates } : null));

    // Auto-discover leagues (non-fatal if it fails). Additive merge in a
    // single Firestore write; respects leagues the user removed.
    try {
      const fresh = await discoverSleeperLeagues(sleeperUser.user_id);
      const { merged, changed } = mergeSleeperLeagues(
        savedLeagues,
        fresh,
        profile?.removedLeagueIds ?? []
      );
      if (changed) {
        const savedOk = await updateUserProfile(currentUser.uid, { leagues: merged });
        if (savedOk) setSavedLeagues(merged);
      }
    } catch {
      // Linking succeeded even if league discovery fails
    }

    return { success: true };
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signOut,
    profile,
    loadingProfile,
    updateProfile,
    savedLeagues,
    addLeague,
    removeLeague,
    linkSleeper,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
