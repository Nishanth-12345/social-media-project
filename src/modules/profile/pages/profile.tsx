import React, { ChangeEvent, FC } from 'react';
import './profileStyles.scss';
import { IconSvg, images } from '../../../common/constants/image';
import MyPost from '../components/my-post';
import { User } from 'firebase/auth';
import { UserData } from '../../../common/appContext/appContext';
import { Post } from '../../../common/appContext/postReducer';

interface ProfileProps {
    user: User | null;
    userData: UserData | null;
    posts: Post[];
    handleProfileImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleBackgroundImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEditProfile: () => void;
    handleCreatePost: () => void;
    renderMedia: (media: string[]) => "camera" | "video" | null;
}


const Profile: FC<ProfileProps> = (props) => {
    const { user, userData, posts, handleProfileImageChange, handleBackgroundImageChange,
        handleEditProfile, handleCreatePost, renderMedia } = props;


    return (
        <div className='profile-container'>
            <div className='profile-banner'
            >
                <div className='profile-image'>
                    { userData?.image != null && userData.image !== '' ?
                     <img src={userData?.image} alt='profile' /> :
                        <div className='add-photo'>
                            <IconSvg.AvatarIcon className='avatar' />
                            <div className='add-option'>
                                <input type="file" className='file' onChange={handleProfileImageChange} />
                                <IconSvg.PlusIcon />
                            </div>
                        </div>}
                </div>

                {userData?.backgroundImage != null && userData.backgroundImage !== '' ? <img src={userData?.backgroundImage} alt='wallpaper' /> :
                    <div className='background-wallpaper'>
                        <div className='add-option'>
                            <input type="file" className='file' onChange={handleBackgroundImageChange} />
                            <IconSvg.PlusIcon />
                        </div>
                    </div>}

                <button className='edit-btn' onClick={handleEditProfile}>
                    <p>Edit Profile</p>
                </button>
            </div>
            <div className='container'>
                <div className='description'>
                    <h1>
                        {userData?.name ? (
                            <p>{userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}</p>
                        ) : null}
                    </h1>

                    {userData?.bio !== null && userData?.bio !== '' ? <p>{userData?.bio}</p> : null}
                </div>
                <div className='user-posts-container'>
                    <p>My Posts</p>
                    <div className='user-posts'>
                        {
                            posts && posts.length > 0 ?
                                posts.map((item) => {
                                    const mediaType = renderMedia(item.media);
                                    return (
                                        <MyPost desc={item.desc} imageType={mediaType} likes={item.likes.length || 2} images={item.media} />
                                    )
                                }) : null

                        }
                    </div>
                </div>
            </div>
            <div className='create-post-btn' onClick={handleCreatePost}>
                <IconSvg.PlusIcon />
            </div>
        </div>
    )
}

export default Profile