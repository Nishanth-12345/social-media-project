import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import './profileStyles.scss';
import { IconSvg, images } from '../../../common/constants/image';
import MyPost from '../components/my-post';
import { User } from 'firebase/auth';
import { AuthContext, UserData } from '../../../common/appContext/appContext';
import { Post } from '../../../common/appContext/postReducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../common/firebase/firebase';
import { useLoading } from '../../../common/appContext/loadingContext';

interface ProfileProps {
    user: User | null;
    userData: UserData | null;
    posts: Post[];
}


const Profile: FC<ProfileProps> = (props) => {
    const { user, userData, posts } = props;

    const [sharePost, setSharePost] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const { setLoading } = useLoading();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is not provided!");
    }
    const navigate = useNavigate();

    const hanldeEditProfile = () => {
        navigate('/edit-profile')
    }
    const handleCreatePost = () => {
        navigate('/create-post');
    }
    const renderMedia = (media: string[]): "camera" | "video" | null => {
        if (!media || media.length === 0) return null;

        // Return the media type for the first media item
        const firstItem = media[0];

        if (firstItem.endsWith(".mp4") || firstItem.endsWith(".mov") || firstItem.endsWith(".avi")) {
            return "video";
        } else {
            return "camera";
        }
    };
    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleBackgroundImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setBackgroundImage(e.target.files[0]);

        }
    };


    useEffect(() => {
        const updateImage = async () => {
            if (!user) return;

            setLoading(true);
            const cloudName = "dogyht9rh";
            const uploadPreset = "socio-media";

            try {
                let profileImageUrl = userData?.image;
                let backgroundImageUrl = userData?.backgroundImage;

                // Handle profile image upload
                if (profileImage) {
                    const formData = new FormData();
                    formData.append("file", profileImage);
                    formData.append("upload_preset", uploadPreset);

                    const response = await axios.post(
                        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                        formData
                    );
                    profileImageUrl = response.data.secure_url;
                }

                // Handle background image upload
                if (backgroundImage) {
                    const formData = new FormData();
                    formData.append("file", backgroundImage);
                    formData.append("upload_preset", uploadPreset);

                    const response = await axios.post(
                        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                        formData
                    );
                    backgroundImageUrl = response.data.secure_url;
                }

                // Update Firestore with the new image URLs
                const usersCollection = collection(db, "users");
                const q = query(usersCollection, where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userRef = doc(db, "users", userDoc.id);

                    // Update only the relevant fields
                    await updateDoc(userRef, {
                        ...(profileImage && { image: profileImageUrl }),
                        ...(backgroundImage && { backgroundImage: backgroundImageUrl }),
                    });

                    console.log("User profile updated successfully");
                    navigate("/profile"); // Navigate to profile page after successful update
                } else {
                    console.log("No user found to update");
                }
            } catch (error) {
                console.error("Error updating profile:", error);
            } finally {
                setLoading(false);
            }
        };

        updateImage();
    }, [profileImage, backgroundImage]);


    return (
        <div className='profile-container'>
            <div className='profile-banner'
            >
                <div className='profile-image'>
                    {userData?.image != null && userData.image !== '' ? <img src={userData?.image} alt='profile' /> :
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

                <button className='edit-btn' onClick={hanldeEditProfile}>
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
                                        <MyPost desc={item.desc} imageType={mediaType} likes={item.likes.length||2} images={item.media} />
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