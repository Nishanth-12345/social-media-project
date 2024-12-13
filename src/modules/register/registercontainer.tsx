import React, { ChangeEvent, FC, FormEvent, KeyboardEvent, useContext, useEffect, useState } from 'react'

import { imageData } from '../../common/data/imageData';
import GoogleSignIn from './pages/googleSignin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../common/firebase/firebase';
import { AuthContext } from '../../common/appContext/appContext';
import { useNavigate } from 'react-router-dom';
import Register from './pages/register';

const RegisterContainer: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) {
      throw new Error("AuthContext is not provided!");
  }

  const { registerUser } = authContext;


  useEffect(() => {
      setLoading(true);
      onAuthStateChanged(auth, (user) => {
          if (user) {
              navigate('/');
              setLoading(false);
          } else {
              setLoading(false);
          }
      })
  }, [navigate]);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
  }
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
}
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
          setLoading(true)
          registerUser(name, email, password);
          setLoading(false);
      } catch (error) {
          setLoading(false)
      }

  }
   
  return (
    <div>
      <GoogleSignIn
        imageData={imageData}
      />
      <Register 
         handleName={handleName}
         loading={loading}
         handleLogin={handleSubmit}
         handleEmail={handleEmail}
         handlePassword={handlePassword}
         name={name}
         email={email}
         password={password}
      />
    </div>
  )
}

export default RegisterContainer;
