import React, { createContext, ReactNode, FC, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from '../firebase/firebase';
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
export interface UserData {
  uid: string;
  name: string;
  email: string;
  image?: string;
  authProvider?: string;
  backgroundImage?:string;
  bio?:string;
}
export interface AuthContextType {
  signInWithGoogle: () => Promise<void>;
  loginWithUserEmail: (email: string, password: string) => Promise<void>;
  registerUser: (name: string, email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  userData: UserData | null;
  user:User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AppContextProps {
  children: ReactNode;
}

const AppContext: FC<AppContextProps> = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const usersCollections = collection(db, "users");

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      console.log("po", popup);
      const user = popup.user;
      const q = query(usersCollections, where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(usersCollections, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          authProvider: popup.providerId,
          backgroundImage:'',
          bio:'',
        });
      }
    } catch (error) {

      if (error instanceof Error)
        console.error("Error signing in with Google: ", error.message);
    }
  };

  const loginWithUserEmail = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);


    } catch (err) {

      if (err instanceof Error)
        alert(err.message)
    }
  }

  const registerUser = async (name: string, email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(usersCollections, {
        uid: user.uid,
        name,
        providerId: "email/password",
        email: user.email,
        backgroundImage:'',
        bio:'',
      })

    } catch (err) {

      if (err instanceof Error)
        alert(err.message)
    }
  }

  const signout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      if (err instanceof Error)
        alert(err.message)
    }

  }


  const userState = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(usersCollections, where("uid", "==", user.uid))
        await onSnapshot(q, (doc) => {
          const docData = doc.docs[0]?.data();
        if (docData) {
          const userData: UserData = {
            uid: docData.uid,
            name: docData.name,
            email: docData.email,
            image: docData.image,
            bio: docData.bio,
            backgroundImage:docData.backgroundImage,
            authProvider: docData.authProvider,
          };
          setUserData(userData);
        }
        });
        setUser(user);
      } else {
        setUser(null);
        navigate('/login');
      }
    })
  }


  useEffect(() => {
    userState();
 
    return () => {
      userState();
    }
  }, []);

  
  const initialState: AuthContextType = {
    signInWithGoogle,
    loginWithUserEmail,
    registerUser,
    signout,
    user,
    userData
  };

  return (
    <AuthContext.Provider value={initialState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AppContext;
