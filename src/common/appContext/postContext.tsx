import { useReducer, useContext, FC, ReactNode, createContext, useEffect } from "react";
import { Post, PostsReducer, PostsState, postsStates } from "./postReducer";
import { query, orderBy, onSnapshot, DocumentData, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";


interface PostProviderProps {
    children: ReactNode;
}
export const PostContext = createContext<{
    state: PostsState;
    dispatch: React.Dispatch<any>;
}>({
    state: postsStates,
    dispatch: () => { },
});

export const PostProvider: FC<PostProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(PostsReducer, postsStates);
  
    const collectionsRef = collection(db, "posts");
      
   
    useEffect(() => {

        const fetchPosts = async () => {
            const q = query(collectionsRef, orderBy("timeStamp", "asc"));
            await onSnapshot(q, (snapshot) => {
                const postsData: Post[] = snapshot.docs.map((doc) => {
                    const data = doc.data() as DocumentData;
                   
                    return {
                        documentId: doc.id, 
                        uid: data.uid || "",
                        logo: data.logo || "",
                        name: data.name || "",
                        email: data.email || "",
                        desc: data.desc || "",
                        media: data.media || [],
                        likes: [],
                        timeStamp: data.timeStamp || new Date(),
                    };
                });
                console.log(postsData, 'posts');
                dispatch({
                    type: "SUBMIT_POST",
                    posts: postsData
                });
            });

        };


        return () => {
            
            fetchPosts();
        }
    }, []);
    return (
        <PostContext.Provider value={{ state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
};
export const usePosts = () => {
    return useContext(PostContext);
};