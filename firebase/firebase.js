import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {getFirestore, collection} from "firebase/firestore";

export const intializaeFirebase = () => {
  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);
};

intializaeFirebase();

export const register = async (name, email, password) => {
  const newUser = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  await updateProfile(newUser.user, { displayName: name });
};

export const login = async (email, password) => {
  const user = await signInWithEmailAndPassword(getAuth(), email, password);
  console.log(user);
};

export const getuserAuth = () => {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return userAuth;
};

export const logout = () => {
  const auth = getAuth();
  signOut(auth);
};


