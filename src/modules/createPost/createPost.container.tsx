import React, { ChangeEvent, FC, useContext, useEffect, useRef, useState } from 'react'
import CreatePost from './createPost'
import PostPreview from './postPreview';
import { images } from '../../common/constants/image';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../common/firebase/firebase';
import { AuthContext } from '../../common/appContext/appContext';


const CreatePostContainer: FC = () => {
  const [createPost, setCreatePost] = useState(true);

  const [description, setDescription] = useState<string>('');
  const [isMobileDevice, setMobileDevice] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [previewMedia, setPreviewMedia] = useState<string[]>([]);

  const [cameraFiles, setCameraFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [desctext, setDescText] = useState<JSX.Element[]>([]);
  const desc = useRef<HTMLDivElement>(null);
  const authContext = useContext(AuthContext);

  let fileMode: "camera" | "video" = "camera";

  if (!authContext) {
    throw new Error("AuthContext is not provided!");
  }

  const { user, userData } = authContext;

  useEffect(() => {
    if (desc.current) {
      console.log(desc.current)
    }

  }, []);

  const handleMediaCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      setCreatePost(false);
      fileMode = 'video';
      setVideoFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
      setPreviewMedia((prevMedia) =>
        [...prevMedia, ...Array.from(newFiles).map((file) => URL.createObjectURL(file))]
      );
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {

    const newFiles = event.target.files;
    if (newFiles) {
      fileMode = 'camera'
      setCreatePost(false);

      setCameraFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
      setPreviewImages((prevImages) =>
        [...prevImages, ...Array.from(newFiles).map((file) => URL.createObjectURL(file))]
      );
    }
  };

  console.log(cameraFiles, 'camera');

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
      setFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
      setCreatePost(false);
      console.log("Selected files:", files);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    console.log(event, 'e')
    const text = event.target.textContent || '';
    setDescription(text);
  };

  console.log(description);


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

  const getCapturedPreview = () => {
    switch (fileMode) {
      case 'camera':
        return previewImages
      case 'video':
        return previewMedia
      default: return []
    }
  }

  useEffect(() => {
    formatDescription();
  }, [description]);

  const collectionsRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;

  const handleCreatePost = async () => {
    try {
      if (description !== '') {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          desc: description,
          image: cameraFiles.length > 0 ? cameraFiles : videoFiles.length > 0 ? videoFiles : []
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return createPost ? (

    <CreatePost
      postDescription={description}
      isMobileDevice={isMobileDevice}
      deviceFiles={files}
      descriptionText={desctext}
      handleCameraCapture={handleCameraCapture}
      handleVideoCapture={handleMediaCapture}
      handleFileUpload={handleCameraCapture}
      handleDescription={handleDescriptionChange}
      handleCreatePost={handleCreatePost}
    />

  ) : <PostPreview images={getCapturedPreview()}
    type={fileMode}
    handleCameraCapture={handleCameraCapture}
    desc='Surrounded by nature’s beauty, finding peace in every leaf, breeze, and sunset. 🌿🌞 
#NatureVibes #OutdoorEscape #EarthLover'
  />
}

export default CreatePostContainer