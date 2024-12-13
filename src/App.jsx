import React, { useState, useEffect } from 'react';
import './App.css';
import './common/constants/globalStyles.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterContainer from './modules/register/registercontainer';
import HomeContainer from './modules/home/home.container'
import ProfileContainer from './modules/profile/pages/profile.container';
import EditProfile from './modules/profile/pages/editProfile';
import CreatePostContainer from './modules/createPost/createPost.container';
import AppContext from './common/appContext/appContext';
import LoginContainer from './modules/login/loginContainer';



function App() {


  return (

    <Router>
      <AppContext>
        <Routes>
          <Route path='/r' element={<RegisterContainer />} />
          <Route path='/' element={<HomeContainer />} />
          <Route path='/p' element={<ProfileContainer />} />
          <Route path='/e' element={<EditProfile />} />
          <Route path='/c' element={<CreatePostContainer />} />
          <Route path='/login' element={<LoginContainer />} />
        </Routes>
      </AppContext>
    </Router>

  );
}



export default App;
