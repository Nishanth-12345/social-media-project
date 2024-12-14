import React, { FC, useContext, useEffect, useState } from 'react'
import './userPostStyles.scss'
import { IconSvg } from '../../../../common/constants/image';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../../../common/firebase/firebase';
import { AuthContext } from '../../../../common/appContext/appContext';
import { usePosts } from '../../../../common/appContext/postContext';
import { Likes, postActions } from '../../../../common/appContext/postReducer';
import SharePost from '../share-post/share-post';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../../../common/appContext/loadingContext';
import { localUrl } from '../../../../common/constants/params';

interface UserPostProps {
  image: string;
  name: string;
  timestamp: string;
  id: string;
  images: string[];
  video?: string;
  description: string;
  background: string;
  likes: Likes[]

}
const renderMedia = (media: string[]) => {

  return media && media.length > 0 ? media.map((item, index) => {
    if (item.endsWith(".mp4") || item.endsWith(".mov") || item.endsWith(".avi")) {

      return (
        <div key={index} className="video-post">
          <video controls className='video'>
            <source src={item} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {

      return (
        <div key={index} className="image-post">
          <img src={item} className='image-post' alt={`media-post-${index}`} />
        </div>
      );
    }
  }) : null;
};

export const UserPost: FC<UserPostProps> = (props) => {
  const { image, name, timestamp, images, id, description, background, likes } = props;
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided!");

  }
  const [postUrl] = useState<string>(`${localUrl}post/${id}`);

  const { user } = authContext;
  const { state, dispatch } = usePosts();
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const likesRef = doc(collection(db, 'posts', id, 'likes'));
  const likesCollection = collection(db, "posts", id, "likes");

  const [sharePost, setSharePost] = useState<boolean>(false);


  const handleOpenSharePost = () => {
    setSharePost(true);
  }

  const handleCloseSharePost = () => {
    setSharePost(false);
  }

  const addLikesForUser = async () => {
    const q = query(likesCollection, where("id", "==", user?.uid));
    const queryPosts = await getDocs(q);
    const likesId = await queryPosts?.docs[0]?.id;

    try {

      if (likesId !== undefined) {

        const deleteId = doc(db, "posts", id, "likes", likesId);
        await deleteDoc(deleteId);

      } else {

        await setDoc(likesRef, {
          id: user?.uid
        });


      }
    } catch (error) {

      console.error("Error adding/removing like:", error);
    }
  };


  useEffect(() => {
    const getLikes = async () => {
      try {

        const q = collection(db, "posts", id, "likes");
        await onSnapshot(q, (snapshot) => {
          const likesData = snapshot.docs.map((doc) => doc.data());
          dispatch({
            type: ADD_LIKE,
            postId: id,
            likes: likesData,
          });
        });

      } catch (err) {

        dispatch({ type: HANDLE_ERROR });
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };
    getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR]);



  return (
    <div className='user-post-container' style={{ backgroundColor: background }}>
      <div className='profile'>
        <div className='image'>
          {image !== null && image !== '' ? <img src={image} alt='profile' /> : <IconSvg.AvatarIcon />}
        </div>
        <div className='details'>
          {name !== null && name !== '' ? <p>{name}</p> : <p>unknown</p>}
          {timestamp !== null && timestamp !== '' && <p>{timestamp}</p>}
        </div>
      </div>
      <div className='post-description'>
        {description !== null && description !== '' && <p>{description}</p>}
      </div>

      <div className='images-container'>
        <div className='post-images-container'>
          {renderMedia(images)}

        </div>
      </div>
      <div className='likes-share-section'>
        <div className='likes' onClick={addLikesForUser}>
          <IconSvg.HeartIcon />
          <span>
            {likes.length > 0 && likes.length}
          </span>

        </div>
        <button className='share' onClick={handleOpenSharePost}>
          <IconSvg.SendIcon />
          <span>Share</span>
        </button>
      </div>
      <SharePost onShare={sharePost} postUrl={postUrl} onModalClose={handleCloseSharePost} />
    </div>
  )
}
