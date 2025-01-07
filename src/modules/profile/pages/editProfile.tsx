import React, { ChangeEvent, FC, useContext, useState } from 'react'
import './profileStyles.scss'
import { IconSvg, images } from '../../../common/constants/image';
import { AuthContext } from '../../../common/appContext/appContext';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../common/firebase/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../../common/appContext/loadingContext';

interface EditProfileProps { }

const EditProfile: FC<EditProfileProps> = (props) => {
  const { } = props;
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided!");
  }

  const { user, userData } = authContext;
  const { setLoading } = useLoading();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);


  const navigate = useNavigate();



  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleBio = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  }
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleBackgroundImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundImage(e.target.files[0]);
    }
  };
  console.log(user?.uid)

  const updateProfile = async () => {
    if (!user) return;

    setLoading(true);
    const cloudName = "dogyht9rh";
    const uploadPreset = "socio-media";
    try {
      let profileImageUrl = userData?.image;
      let backgroundImageUrl = userData?.backgroundImage;

      if (profileImage) {
        const formData = new FormData();
        formData.append("file", profileImage);
        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );
        profileImageUrl = response.data.secure_url;
      }

      if (backgroundImage) {
        const formData = new FormData();
        formData.append("file", backgroundImage);
        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );
        backgroundImageUrl = response.data.secure_url;
      }
      console.log(backgroundImageUrl, profileImageUrl)
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, 'users', userDoc.id);

        await updateDoc(userRef, {
          name,
          bio,
          image: profileImageUrl,
          backgroundImage: backgroundImageUrl,
        });
        navigate('/profile')
        console.log('User profile updated successfully');
      } else {
        console.log('No user found to update');
      }

    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <div className='edit-profile-container'>
        <div className='profile-banner'
        >
          <div className='profile-image edit-image'>
            {profileImage || userData?.image ? <img src={profileImage ? URL.createObjectURL(profileImage) : userData?.image} alt="profile" /> : <IconSvg.AvatarIcon className='avatar' />}
            <div className='edit-option'>
              <input type="file" onChange={handleProfileImageChange} className='file' />
              <IconSvg.EditIcon />
            </div>
          </div>
          <div className='background'>
          {backgroundImage || userData?.backgroundImage ? <img src={backgroundImage ? URL.createObjectURL(backgroundImage) : userData?.backgroundImage} alt="wallpaper" /> : <div className='background-wallpaper'> 
            </div>}
          <div className='add-option'>
            <input type="file" onChange={handleBackgroundImageChange} className='file' />
            <IconSvg.EditIcon />
          </div>
          </div>
      
        </div>
        <div className='input-edit-container container'>
          <div className='input-field'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={handleName}
            />
          </div>
          <div className='input-field'>
            <label>Bio</label>
            <textarea
              name='bio'
              value={bio}
              onChange={handleBio}
            />
          </div>
        </div>
        <div className='profile-edit-btn'>
          <button className='save-profile' onClick={updateProfile}>
            <p>Save</p>
          </button>
        </div>
      </div>
      </div>
      )
}

export default EditProfile