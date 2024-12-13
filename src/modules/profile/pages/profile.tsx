import React, { FC, useState } from 'react';
import './profileStyles.scss';
import { IconSvg, images } from '../../../common/constants/image';
import MyPost from '../components/my-post';
import { User } from 'firebase/auth';
import { UserData } from '../../../common/appContext/appContext';

interface ProfileProps {
 user: User | null;
  userData: UserData | null;
}

const Profile: FC<ProfileProps> = (props) => {
    const { user, userData } = props;

    const [sharePost, setSharePost] = useState<boolean>(false);

    const handleOpenSharePost = () => {
        setSharePost(true);
    }

    const handleCloseSharePost = () => {
        setSharePost(false);
    }

    return (
        <div className='profile-container'>
            <div className='profile-banner'

            >
                <div className='profile-image'>
                    <img src={images.img} alt='profile' />
                </div>
                <img src={images.wallpaper} alt='wallpaper' />
                <button className='edit-btn'>
                    <p>Edit Profile</p>
                </button>
            </div>
            <div className='container'>
                <div className='description'>
                    <h1>{(user?.displayName === null && userData?.name !== undefined) ? userData?.name?.charAt(0).toUpperCase() + userData?.name.slice(1) : user?.displayName?.split(" ")[0]}</h1>
                    <p>Just someone who loves designing, sketching, and finding beauty in the little things 💕</p>
                </div>
                <div className='user-posts-container'>
                    <p>My Posts</p>
                    <div className='user-posts'>
                        <MyPost desc={'Design meet'} likes={67} images={[images.postImage, images.parachute]} />
                        <MyPost desc={'Working on a B2B..'} likes={0} images={images.girlImage} />
                        <MyPost desc={'Parachute ❤️'} likes={65} images={images.parachute} />

                    </div>
                </div>
            </div>
            <div className='create-post-btn' onClick={handleOpenSharePost}>
                <IconSvg.PlusIcon />
            </div>
        </div>
    )
}

export default Profile