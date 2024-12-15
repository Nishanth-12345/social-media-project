import React, { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react';
import Profile from './profile';
import { AuthContext } from '../../../common/appContext/appContext';
import { usePosts } from '../../../common/appContext/postContext';
import { Post } from '../../../common/appContext/postReducer';
import { db } from '../../../common/firebase/firebase';
import { collection, onSnapshot, query, where, DocumentData, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useLoading } from '../../../common/appContext/loadingContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cloudName, uploadPreset } from '../../../common/constants/params';

interface ProfileContainerProps {}

const ProfileContainer: FC<ProfileContainerProps> = (props) => {
    const { } = props;
  
    const { state, dispatch } = usePosts();
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const { setLoading } = useLoading();
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is not provided!");
    }
    const { user, userData } = authContext;
    const navigate = useNavigate();

    const handleEditProfile = () => {
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


    const fetchUserPosts = useCallback(async () => {
        if (user?.uid) {
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("uid", "==", user.uid));
            
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setLoading(true);
                if (!snapshot.empty) {
                    const postsData: Post[] = snapshot.docs.map((doc) => {
                        const data = doc.data() as DocumentData; 
                        console.log(data);
                        return {
                            documentId: doc.id,
                            uid: data.uid || '',
                            logo: data.logo || '',
                            name: data.name || '',
                            email: data.email || '',
                            desc: data.desc || '',
                            media: data.media || [],
                            likes: data.likes || [],
                            timeStamp: data.timeStamp || new Date(),
                        };
                    });

                    setUserPosts(postsData); 
                    setLoading(false);
                    console.log(postsData, 'userposts');
                }
            });

            return unsubscribe;
        }
    },[user?.uid, setLoading]);

    useEffect(() => {
        if (user?.uid) {
            fetchUserPosts();
        } else {
            console.error("User UID is not available");
        }
    }, [user?.uid]);



    useEffect(() => {
        const updateImage = async () => {
            if (!user) return;

            setLoading(true);

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

                const usersCollection = collection(db, "users");
                const q = query(usersCollection, where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userRef = doc(db, "users", userDoc.id);

                    await updateDoc(userRef, {
                        ...(profileImage && { image: profileImageUrl }),
                        ...(backgroundImage && { backgroundImage: backgroundImageUrl }),
                    });

                    console.log("User profile updated successfully");
                    navigate("/profile");
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
        <div>
            <Profile
                user={user}
                userData={userData}
                posts={userPosts}
                handleBackgroundImageChange={handleBackgroundImageChange}
                handleCreatePost={handleCreatePost}
                handleEditProfile={handleEditProfile}
                handleProfileImageChange={handleProfileImageChange}
                renderMedia={renderMedia}
            />
        </div>
    );
}

export default ProfileContainer;
