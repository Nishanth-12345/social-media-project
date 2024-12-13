import React, { FC, useState } from 'react';

import './homeStyles.scss';
import ProfileDetail from '../../common/components/profile-detail/profile-detail';
import { IconSvg, images } from '../../common/constants/image';

import Modal from '../../common/components/modal/modal';
import { UserPost } from './components/user-post/user-post';
import SharePost from './components/share-post/share-post';

interface HomeProps {

}

const Home: FC<HomeProps> = () => {
  const [sharePost, setSharePost] = useState<boolean>(false);

  const handleOpenSharePost = () => {
    setSharePost(true);
  }

  const handleCloseSharePost = () => {
    setSharePost(false);
  }
  
  const colors = ['#F7EBFF','#FFFAEE'];

  return (
    <div className='container home'>
      <ProfileDetail className='profile' name='Sakshi Agarwal' image={images.profileImg} />
      <h1>Feeds</h1>

      <div className='feeds-container'>
        <UserPost
          image={images.profileImg}
          name='Aarav'
          images={[images.userPost1, images.userPost2]}
          imageType={'images'}
          timestamp='2 hours ago'
          description={'Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel'}
          likes={2}
          background={colors[0]}
          onSharePost={handleOpenSharePost}
        />
        <UserPost
          image={images.profileImg}
          name='Aarav'
          images={[images.userPost1, images.userPost2]}
          imageType={'images'}
          timestamp='2 hours ago'
          description={'Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel'}
          likes={2}
          background={colors[1]}
          onSharePost={handleOpenSharePost}
        />
      </div>
      <div className='create-post-btn' onClick={handleOpenSharePost}>
         <IconSvg.PlusIcon />
      </div>
     <SharePost onShare={sharePost} postUrl='http://whatsapp.com' onModalClose={handleCloseSharePost}/>
    </div>
  )
}

export default Home;
