import React, { FC, useContext, useReducer } from 'react'
import Home from './home'
import { AuthContext } from '../../common/appContext/appContext';
import { postActions, PostsReducer } from '../../common/appContext/postReducer';
import { usePosts } from '../../common/appContext/postContext';
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../common/firebase/firebase';

const initialState = {
  posts: [], 
  error: false,
};

const HomeContainer:FC = () => {
   const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is not provided!");
    }
    
    const { signout, user, userData } = authContext;
    const { state, dispatch } = usePosts();
    const { posts, error } = state;
    
   
  return (
    <Home 
      signout={signout}
      user={user}
      userData={userData}
      posts={posts}
      error={error}
      
    />
  )
}

export default HomeContainer;
