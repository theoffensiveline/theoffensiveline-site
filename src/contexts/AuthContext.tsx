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
import { getSleeperUserByUsername, getNflState } from "../utils/api/SleeperAPI";

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
    async (userId: string) => {
      setLoadingProfile(true);
      let userProfile = await getUserProfile(userId);
      const currentEmail = currentUser?.email || "";
      if (!userProfile && currentUser?.displayName) {
        // Create profile with Google display name and email if it doesn't exist
        const newProfile = {
          customDisplayName: currentUser.displayName,
          email: currentEmail,
        };
        await setUserProfile(userId, newProfile);
        setProfile(newProfile);
        setSavedLeagues([]);
      } else if (userProfile) {
        // Update existing profile if email is missing or different
        if (!userProfile.email || userProfile.email !== currentEmail) {
          const updatedProfile = { ...userProfile, email: currentEmail };
          await updateUserProfile(userId, { email: currentEmail });
          setProfile(updatedProfile);
        } else {
          setProfile(userProfile);
        }
        setSavedLeagues(userProfile.leagues ?? []);
      } else {
        setProfile(null);
        setSavedLeagues([]);
      }
      setLoadingProfile(false);
    },
    [currentUser?.displayName, currentUser?.email]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadProfile(user.uid);
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
   * auto-saves the user's current-season leagues to savedLeagues.
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

    // Auto-discover leagues for the current season (non-fatal if it fails)
    try {
      const nflState = await getNflState();
      const res = await fetch(
        `https://api.sleeper.app/v1/user/${sleeperUser.user_id}/leagues/nfl/${nflState.season}`
      );
      const leagues: any[] = res.ok ? await res.json() : [];
      for (const league of leagues) {
        await addLeague({
          id: league.league_id,
          type: "sleeper",
          name: league.name,
          year: parseInt(nflState.season, 10),
          avatar: league.avatar ? `https://sleepercdn.com/avatars/${league.avatar}` : undefined,
        });
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
