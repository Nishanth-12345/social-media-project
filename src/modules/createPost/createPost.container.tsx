import React, { FC, useState } from 'react'
import CreatePost from './createPost'
import PostPreview from './postPreview';
import { images } from '../../common/constants/image';


const CreatePostContainer: FC = () => {
  const [createPost, setCreatePost] = useState(true);
  return createPost ? (

    <CreatePost setCreate={setCreatePost}/>

  ) : <PostPreview images={[images.newPostImg, images.parachute]}
    desc='Surrounded by nature’s beauty, finding peace in every leaf, breeze, and sunset. 🌿🌞 
#NatureVibes #OutdoorEscape #EarthLover'
  />
}

export default CreatePostContainer