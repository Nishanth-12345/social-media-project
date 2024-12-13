import React, { FC, useContext } from 'react'
import Home from './home'
import { AuthContext } from '../../common/appContext/appContext';

const HomeContainer:FC = () => {
   const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is not provided!");
    }

    const { signout, user, userData } = authContext;

  return (
    <Home 
      signout={signout}
      user={user}
      userData={userData}
    />
  )
}

export default HomeContainer;
