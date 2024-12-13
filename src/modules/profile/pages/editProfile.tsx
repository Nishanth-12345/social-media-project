import React, { ChangeEvent, FC, useState } from 'react'
import './profileStyles.scss'
import { IconSvg, images } from '../../../common/constants/image';

interface EditProfileProps { }

const EditProfile: FC<EditProfileProps> = (props) => {
  const { } = props;
  const [name, setName] = useState('Sakshi Agarwal');
  const [bio, setBio] = useState('Just someone who loves designing, sketching, and finding beauty in the little things 💕 ');

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleBio = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  }

  return (
    <div className='edit-profile-container'>
      <div className='profile-banner'

      >
        <div className='profile-image edit-image'>
          <img src={images.img} alt='profile' />
          <div className='edit-option'>
            <IconSvg.EditIcon />
          </div>
        </div>
        <img src={images.wallpaper} alt='wallpaper' />
        <div className='edit-option'>
          <IconSvg.EditIcon />
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
        <button className='save-profile'>
          <p>Save</p>
        </button>
      </div>

    </div>
  )
}

export default EditProfile