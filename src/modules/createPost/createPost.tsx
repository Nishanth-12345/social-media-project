import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import NavigateBack from '../../common/components/navigateBack';
import { IconSvg } from '../../common/constants/image';
import './styles.scss'

interface CreatePostProps {
  setCreate: Dispatch<SetStateAction<boolean>>;
}

const CreatePost: FC<CreatePostProps> = (props) => {
  const { setCreate } = props;
  const [description, setDescription] = useState<string>('');
  const [isMobileDevice, setMobileDevice] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewMedia, setPreviewMedia] = useState<string[]>([]);

  const [cameraFiles, setCameraFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const desc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (desc.current) {
      console.log(desc.current)
    }

  }, []);

  const handleMediaCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      setCreate(false);
      setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
      setPreviewMedia((prevMedia) =>
        [...prevMedia, ...Array.from(newFiles).map((file) => URL.createObjectURL(file))]
      );
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      setCreate(false);
      setCameraFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
      setPreviewImages((prevImages) =>
        [...prevImages, ...Array.from(newFiles).map((file) => URL.createObjectURL(file))]
      );
    }
  };

  const checkTouchDevice = () => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasPointerEvents = window.matchMedia('(pointer: coarse)').matches;
    const userAgent = navigator.userAgent.toLowerCase();

    const isMobile = /mobile|tablet|ip(ad|hone|od)|android/i.test(userAgent);

    return (hasTouch && hasPointerEvents) || isMobile;
  };


  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const result = checkTouchDevice();
    if (isTouchDevice !== result) {
      setIsTouchDevice(result);
    }
  }, [isTouchDevice]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1025 && isTouchDevice) {
        setMobileDevice(true);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files !== null && files.length) {
      // Process selected files
      setCreate(false);
      console.log("Selected files:", files);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    console.log(event, 'e')
    const text = event.target.textContent || '';
    setDescription(text);
  };

  console.log(description);
  const [desctext, setDescText] = useState<JSX.Element[]>([]);

  const formatDescription = () => {

    const temp: JSX.Element[] = [];
    description.split(/((?:^|\s)(?:#[a-z\d-] || @[a-z\d-]+))/gi).filter(Boolean).map((word) => {
      if (word.startsWith('#')) {
        return temp.push(<span className='blue'>{word}</span>)
      } else {
        return temp.push(<span>{word}</span>)
      }
    })
    setDescText(temp);
  };

  useEffect(() => {
    formatDescription();
  }, [description]);


  return (
    <div className='create-post-container container'>
      <NavigateBack path='New Post' />
      <div className='post-container'>

        <div
          contentEditable
          suppressContentEditableWarning
          onInput={handleDescriptionChange}
          className='text-desc'
          placeholder="What's on your mind?"
          ref={desc}
        >

          <div style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>
            {desctext}
          </div>
        </div>
        {
          isMobileDevice ? <div className='select-folder' >
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
                onChange={handleMediaCapture} />
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
          </div> : <div className='select-folder'>
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
        }
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