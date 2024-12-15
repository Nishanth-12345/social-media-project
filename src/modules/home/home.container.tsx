import React, { FC, useContext } from 'react'
import Home from './home'
import { AuthContext } from '../../common/appContext/appContext';
import { usePosts } from '../../common/appContext/postContext';


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
