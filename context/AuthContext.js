import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase/firebaseconfig";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [passcode, setPasscode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const storedPasscode = await AsyncStorage.getItem("scholarMind_passcode");
        if (storedPasscode) setPasscode(storedPasscode);
      } else {
        setUser(null);
        setPasscode(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const signup = async (email, password) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("scholarMind_passcode");
    await AsyncStorage.removeItem(`scholarMind_goals_${user.id}`);
    await AsyncStorage.removeItem(`scholarMind_subjects_${user.id}`);
    await AsyncStorage.removeItem(`scholarMind_sessions_${user.id}`);
    await signOut(auth);
  };

  const setupPasscode = async (code) => {
    setPasscode(code);
    await AsyncStorage.setItem("scholarMind_passcode", code);
  };

  const verifyPasscode = (code) => {
    return code === passcode || code === "biometric";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        setupPasscode,
        verifyPasscode,
        isPasscodeSet: !!passcode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
