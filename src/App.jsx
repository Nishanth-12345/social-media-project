import React, { useState, useEffect } from 'react';
import './App.css';
import './common/constants/globalStyles.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterContainer from './modules/register/registercontainer';
import HomeContainer from './modules/home/home.container'
import ProfileContainer from './modules/profile/pages/profile.container';
import EditProfile from './modules/profile/pages/editProfile';
import CreatePostContainer from './modules/createPost/createPost.container';
import AppContext from './common/appContext/appContext';
import LoginContainer from './modules/login/loginContainer';
import { PostProvider } from './common/appContext/postContext';
import GoogleAuthContainer from './modules/googleAuth/googleAuthContainer';
import { LoadingProvider } from './common/appContext/loadingContext';
import GlobalLoader from './common/components/loader/globalLoader';



function App() {


  return (

    <Router>
      <PostProvider>
      <AppContext>
        <LoadingProvider>
            <GlobalLoader /> 
            <Routes>
             <Route path="/*" element={<Navigate to="/" />}/>
              <Route path='/register' element={<RegisterContainer />} />
              <Route path='/' element={<HomeContainer />} />
              <Route path='/google-sign-in' element={<GoogleAuthContainer />} />
              <Route path='/profile' element={<ProfileContainer />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/create-post' element={<CreatePostContainer />} />
              <Route path='/login' element={<LoginContainer />} />
            </Routes>
        </LoadingProvider>
        </AppContext>
      </PostProvider>
    </Router>

  );
}



export default App;
