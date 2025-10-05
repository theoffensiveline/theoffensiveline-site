import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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
  UserProfile,
} from "../utils/survivorUtils";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  profile: UserProfile | null;
  loadingProfile: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const auth = getAuth(app);

  const loadProfile = useCallback(
    async (userId: string) => {
      setLoadingProfile(true);
      const userProfile = await getUserProfile(userId);
      if (!userProfile && currentUser?.displayName) {
        // Create profile with Google display name if it doesn't exist
        const newProfile = { customDisplayName: currentUser.displayName };
        await setUserProfile(userId, newProfile);
        setProfile(newProfile);
      } else {
        setProfile(userProfile);
      }
      setLoadingProfile(false);
    },
    [currentUser?.displayName]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadProfile(user.uid);
        setLoading(false);
      } else {
        setProfile(null);
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

  const updateProfile = async (
    updates: Partial<UserProfile>
  ): Promise<boolean> => {
    if (!currentUser) return false;
    const success = await updateUserProfile(currentUser.uid, updates);
    if (success) {
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      // Update all existing picks with the new username
      if (updates.customDisplayName) {
        await updateAllUserPicksUsername(
          currentUser.uid,
          updates.customDisplayName
        );
      }
    }
    return success;
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signOut,
    profile,
    loadingProfile,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
