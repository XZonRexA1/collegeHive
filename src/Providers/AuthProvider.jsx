import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import app from "../firebase/firebase.config";
  import { createContext, useState } from "react";
  import { useEffect } from "react";
  
  export const AuthContext = createContext(null);
  
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // creating user
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
    // creating signIN
    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    // creating log out
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
    // observe auth state change
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
        setUser(loggedUser);
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    // sign in with google
    const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  
    // sign in with github
    const signInWithGithub = () => signInWithPopup(auth, githubProvider)


    // Reset password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
    const authInfo = {
      user,
      loading,
      createUser,
      signInWithGoogle,
      signInWithGithub,
      signIn,
      logOut,
      resetPassword
    };
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  