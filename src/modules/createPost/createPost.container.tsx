import React, { ChangeEvent, FC, useContext, useEffect, useReducer, useRef, useState } from 'react'
import CreatePost from './createPost'
import PostPreview from './postPreview';
import { images } from '../../common/constants/image';
import { addDoc, collection, doc, DocumentData, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../common/firebase/firebase';
import { AuthContext } from '../../common/appContext/appContext';
import { Post, PostsReducer, postActions, postsStates } from '../../common/appContext/postReducer';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../common/appContext/loadingContext';

const CreatePostContainer: FC = () => {
  const [createPost, setCreatePost] = useState(true);

  const [description, setDescription] = useState<string>('');
  const [isMobileDevice, setMobileDevice] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File | null>(null);
  const [previewMedia, setPreviewMedia] = useState<string[]>([]);

  const [cameraFiles, setCameraFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [desctext, setDescText] = useState<JSX.Element[]>([]);
  const desc = useRef<HTMLDivElement>(null);
  const authContext = useContext(AuthContext);
  const [fileMode, setFileMode] = useState<"camera" | "video">("camera");
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  if (!authContext) {
    throw new Error("AuthContext is not provided!");
  }

  const { user, userData } = authContext;


  const handleMediaCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];
    if (newFile) {
      setCreatePost(false);
      setFileMode("video");
      setVideoFiles(newFile);
      setPreviewMedia([URL.createObjectURL(newFile)]);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;

    if (newFiles) {
      const fileArray = Array.from(newFiles);


      const isVideo = fileArray[0]?.type.startsWith("video/");
      const isImage = fileArray.every(file => file.type.startsWith("image/"));

      if (isVideo) {

        const videoFile = fileArray[0];

        setFileMode("video");
        setVideoFiles(videoFile);
        setPreviewMedia([URL.createObjectURL(videoFile)]); // Preview the video
        setCreatePost(false);
      } else if (isImage) {

        setFileMode("camera");
        setCameraFiles((prevFiles) => [...prevFiles, ...fileArray]);
        setPreviewImages((prevImages) =>
          [...prevImages, ...fileArray.map((file) => URL.createObjectURL(file))]
        );
        setCreatePost(false);
      } else {
        alert("Unsupported file type. Please upload images or videos only.");
      }
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


  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

    const text = event.target.value || '';
    setDescription(text);
  };

  // console.log(description);


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
  const cloudName = "dogyht9rh";
  const uploadPreset = "socio-media";

  const submitImageOrVideo = async () => {

    const image = fileMode === "camera" ? cameraFiles : videoFiles;
    let uploadedUrls: string[] = [];

    try {
      setLoading(true);
      // Upload Images
      if (fileMode === "camera" && cameraFiles.length > 0) {
        // Upload multiple images
        for (let file of cameraFiles) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            formData
          );

          uploadedUrls.push(response.data.secure_url);
        }
      } else if (fileMode === "video" && videoFiles) {
        // Upload a single video
        const formData = new FormData();
        formData.append("file", videoFiles);
        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );

     
        uploadedUrls.push(response.data.secure_url);
      }
   
      await setDoc(postRef, {
        documentId: document,
        uid: user?.uid || userData?.uid,
        logo: user?.photoURL,
        name: user?.displayName || userData?.name,
        email: user?.email || userData?.email,
        desc: description,
        media: uploadedUrls,
        timeStamp: serverTimestamp(),
      });

      setCameraFiles([]);
      setVideoFiles(null);
      setPreviewMedia([]);
      setDescription("");
      setLoading(false);
      navigate('/')

    } catch (error) {
      setLoading(false);
      console.error("Error uploading media:", error);
      alert("Failed to upload media. Please try again.");
    }
  };



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
      handleCreatePost={submitImageOrVideo}
    />

  ) : <PostPreview images={getCapturedPreview()}
    type={fileMode}
    handleCameraCapture={handleCameraCapture}
    desc={description}
    handleCreatePost={submitImageOrVideo}
  />
}

export default CreatePostContainer