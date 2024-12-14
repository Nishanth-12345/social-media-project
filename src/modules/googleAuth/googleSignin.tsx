import React, { ChangeEvent, FC, useContext } from 'react';
import './styles.scss'
import { AuthContext } from '../../common/appContext/appContext';
import { ImageData } from '../../common/data/imageData';
import { IconSvg, images } from '../../common/constants/image';


interface GoogleSignInProps {
  imageData: ImageData[];
}

const GoogleSignIn: FC<GoogleSignInProps> = (props) => {
  const {
    imageData
  } = props;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided!");
  }

  const { signInWithGoogle } = authContext;


  return (
    <div className='GoogleSignIn-container'>
      <div className='gallery-container'>
        <div className='gallery'>
          {imageData.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className={`gallery-item `}
            >
              <img src={image.image} alt='image' />
            </div>
          ))}

        </div>
        <div className='gallery'>
          {imageData.slice(3, 6).map((image, index) => (
            <div
              key={index}
              className={`gallery-item `}
            >
              <img src={image.image} alt='image' />
            </div>
          ))}

        </div>
        <div className='gallery'>
          {imageData.slice(6, 9).map((image, index) => (
            <div
              key={index}
              className={`gallery-item `}
            >
              <img src={image.image} alt='image' />
            </div>
          ))}

        </div>
      </div>
      <div className='signup-platform'>
        <div className='logo-container'>
          <img src={images.mediaLogo} alt='logo' />
          <h1>Vibesnap</h1>
        </div>
        <p>Moments That Matter, Shared Forever.</p>
        <button className='signup-button' onClick={signInWithGoogle}>
          <IconSvg.GoogleIcon />
          <p>Continue with Google</p>
        </button>
      </div>
    </div>
  )
}

export default GoogleSignIn
