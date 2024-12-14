import React, { FC, useContext, useEffect, useState } from 'react';
import Profile from './profile';
import { AuthContext } from '../../../common/appContext/appContext';
import { usePosts } from '../../../common/appContext/postContext';
import { Post } from '../../../common/appContext/postReducer';
import { db } from '../../../common/firebase/firebase';
import { collection, onSnapshot, query, where, DocumentData } from 'firebase/firestore';
import { useLoading } from '../../../common/appContext/loadingContext';

interface ProfileContainerProps {}

const ProfileContainer: FC<ProfileContainerProps> = (props) => {
    const { } = props;
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is not provided!");
    }
    const { user, userData } = authContext;
    const { state, dispatch } = usePosts();
    const { posts, error } = state;
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const { setLoading } = useLoading();

    const fetchUserPosts = async () => {
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
    };

    useEffect(() => {
        if (user?.uid) {
            fetchUserPosts();
        } else {
            console.error("User UID is not available");
        }
    }, [user?.uid]);

    return (
        <div>
            <Profile
                user={user}
                userData={userData}
                posts={userPosts}
            />
        </div>
    );
}

export default ProfileContainer;
