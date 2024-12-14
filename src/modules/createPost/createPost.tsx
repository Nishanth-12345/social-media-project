import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import NavigateBack from '../../common/components/navigateBack';
import { IconSvg } from '../../common/constants/image';
import './styles.scss'

interface CreatePostProps {
  postDescription: string;
  isMobileDevice: boolean;
  deviceFiles: File[];
  descriptionText: JSX.Element[];
  handleVideoCapture: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCameraCapture: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleCreatePost: () => void;
}

const CreatePost: FC<CreatePostProps> = (props) => {
  const {
    postDescription,
    isMobileDevice,
    descriptionText,
    deviceFiles,
    handleCameraCapture,
    handleDescription,
    handleFileUpload,
    handleVideoCapture,
    handleCreatePost
  } = props;



  return (
    <div className='create-post-container container'>
      <NavigateBack path='New Post' />
      <div className='post-container'>
        <div className='description-container'>
          <textarea
            onChange={handleDescription}
            value={postDescription}
            placeholder="What's on your mind?"

          />

          <div className='text-desc'>
            {descriptionText}
          </div>
        </div>
        {
          isMobileDevice ? (
            <div className='select-folder' >
              <div className='option'>
                <IconSvg.PhotoIcon />
                <p>Photos</p>
                <input
                  type="file"
                  id="filePicker"
                  accept="image/*, video/*"
                  className='camera'
                  multiple
                  onChange={handleFileUpload}
                />
              </div>
              <div className='option'>
                <input type='file' id='camera' accept='video/*' className='camera' capture="user"
                  multiple
                  onChange={handleVideoCapture} />
                <IconSvg.VideoIcon />
                <p>Video</p>
              </div>
              <div className='option'>
                <input type='file' id='camera' accept='image/*' capture='user'
                  multiple
                  className='camera'
                  onChange={handleCameraCapture}
                />
                <IconSvg.CameraIcon />
                <p>Camera</p>
              </div>
            </div>) :
            (<div className='select-folder'>
              <div className='option' >
                <IconSvg.FolderOpenIcon />
                <p>Choose the file</p>
                <input
                  type="file"
                  id="filePicker"
                  accept="image/*, video/*"
                  className='camera'
                  multiple
                  onChange={handleFileUpload}
                />
              </div>
              <div className='option'>
                <IconSvg.CameraIcon />
                <p>Camera</p>
                <input type='file' id='camera' accept='image/*' className='camera' capture='user'
                  multiple
                  onChange={handleCameraCapture}
                />
              </div>

            </div>
            )}
      </div>
      <div id="previewContainer" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}></div>

      <div className='profile-edit-btn'>
        <button className='create'>
          <p>Create</p>
        </button>
      </div>
    </div>
  )
}

export default CreatePost