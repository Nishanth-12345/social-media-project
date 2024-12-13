import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

import { imageData } from '../../common/data/imageData';
import GoogleSignIn from './pages/googleSignin';

const RegisterContainer: FC = () => {
  
   
  return (
    <div>
      <GoogleSignIn
        imageData={imageData}
      />
      {/* <Register /> */}
    </div>
  )
}

export default RegisterContainer;
