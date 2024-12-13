import React, { FC, useState } from 'react';

import './homeStyles.scss';
import ProfileDetail from '../../common/components/profile-detail/profile-detail';
import { IconSvg, images } from '../../common/constants/image';

import Modal from '../../common/components/modal/modal';
import { UserPost } from './components/user-post/user-post';
import SharePost from './components/share-post/share-post';
import { User } from 'firebase/auth';
import { UserData } from '../../common/appContext/appContext';
import { Link } from 'react-router-dom';

interface HomeProps {
  signout: () => void;
  user: User | null;
  userData: UserData | null;
}

const Home: FC<HomeProps> = (props) => {
  const { signout, user, userData } = props;
  const [sharePost, setSharePost] = useState<boolean>(false);

  const handleOpenSharePost = () => {
    setSharePost(true);
  }

  const handleCloseSharePost = () => {
    setSharePost(false);
  }

  const colors = ['#F7EBFF', '#FFFAEE'];

  return (
    <div className='container home'>
     <Link to={`/${'p'}`}>
      <ProfileDetail className='profile'
        name={(user?.displayName === null && userData?.name !== undefined) ? userData?.name?.charAt(0).toUpperCase() + userData?.name.slice(1) : user?.displayName?.split(" ")[0]}
        image={images.profileImg} />
        </Link>
      <button onClick={signout}>signout</button>
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
      <SharePost onShare={sharePost} postUrl='http://whatsapp.com' onModalClose={handleCloseSharePost} />
    </div>
  )
}

export default Home;
