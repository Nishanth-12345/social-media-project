import { Timestamp } from "firebase/firestore";
export interface Likes {
    id: string;
}
export type Post = {
    documentId: string;
    uid: string;
    logo: string;
    name: string;
    email: string;
    desc: string;
    media: string[];
    timeStamp: Timestamp;
    likes: Likes[];
};
export const postActions = {
    SUBMIT_POST: "SUBMIT_POST",
    HANDLE_ERROR: "HANDLE_ERROR",
    RESET_STATE: "RESET_STATE",
    ADD_LIKE: "ADD_LIKE",
    USER_POSTS: "USER_POSTS"
} as const;

export interface PostsState {
    error: boolean;
    posts: Post[];
    userPosts: Post[];
}



type PostsAction =
    | { type: typeof postActions.SUBMIT_POST; posts: Post[] }
    | { type: typeof postActions.USER_POSTS; posts: Post[] }
    | { type: typeof postActions.ADD_LIKE; postId: string; likes: Likes[] }
    | { type: typeof postActions.HANDLE_ERROR }
    | { type: typeof postActions.RESET_STATE };

// initial state
export const postsStates: PostsState = {
    error: false,
    posts: [],
    userPosts: [],
};

// Reducer function
export const PostsReducer = (
    state: PostsState,
    action: PostsAction
): PostsState => {
    switch (action.type) {
        case postActions.SUBMIT_POST:
            return {
                ...state,
                error: false,
                posts: action.posts
            };
        case postActions.USER_POSTS:
            return {
                ...state,
                error: false,
                userPosts: action.posts
            };
        case postActions.ADD_LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post.documentId === action.postId
                        ? { ...post, likes: action.likes } // Update likes for the specific post
                        : post // Leave other posts unchanged
                ),
                error: false,
            };

        case postActions.HANDLE_ERROR:
            return {
                ...state,
                error: true,
                posts: [],
            };
        case postActions.RESET_STATE:
            return postsStates;
        default:
            return state;
    }
};

