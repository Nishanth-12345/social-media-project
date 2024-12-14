import React, { FC, useState } from 'react';

import './homeStyles.scss';
import ProfileDetail from '../../common/components/profile-detail/profile-detail';
import { IconSvg, images } from '../../common/constants/image';

import Modal from '../../common/components/modal/modal';
import { UserPost } from './components/user-post/user-post';
import SharePost from './components/share-post/share-post';
import { User } from 'firebase/auth';
import { UserData } from '../../common/appContext/appContext';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../../common/appContext/postReducer';
import { convertTimestamp } from '../../common/helpers/dateConverter';

interface HomeProps {
  signout: () => void;
  user: User | null;
  userData: UserData | null;
  posts: Post[];
  error: boolean;

}

const Home: FC<HomeProps> = (props) => {
  const { signout, user, userData, posts, error} = props;
  const [sharePost, setSharePost] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create-post')
  }

  const colors = ['#F7EBFF', '#FFFAEE'];

  return (
    <div className='container home'>
      <div className='top-section'>
        <Link to={`/${'profile'}`}>
          <ProfileDetail className='profile'
            name={(user?.displayName === null && userData?.name !== undefined) ? userData?.name?.charAt(0).toUpperCase() + userData?.name.slice(1) : user?.displayName?.split(" ")[0]}
            image={userData?.image} />
        </Link>
        <button className='sign-out' onClick={signout}>signout</button>
      </div>
      <h1>Feeds</h1>
      {
        error ? <div>something wrong</div> :
      
      <div className='feeds-container'>
        {
           posts?.length > 0 ? (
            posts?.map((item,index) => {
              return (
                <UserPost
                  key={index}
                  image={item.logo}
                  name={item.name}
                  images={item.media}
                  timestamp={convertTimestamp(item.timeStamp)}
                  description={item.desc}
                  id={item.documentId}
                  background={index % 2 === 0 ? colors[1] : colors[0]}
                  likes={item.likes}
               
                />
              )
            })
          ) : null
        }
   
      </div> }
      <div className='create-post-btn' onClick={handleCreatePost}>
        <IconSvg.PlusIcon />
      </div>

    </div>
  )
}

export default Home;
