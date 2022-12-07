import { CREATE, DELETE, END_CREATING, END_DELETING, END_LOADING, FETCH_ALL, FETCH_POST, START_CREATING, START_DELETING, START_LOADING, UPDATE_COMMENT } from "../constants/actionTypes";

const initState = {
    isLoading: true,
    creating: false,
    deleting: false,
    posts: [],
    userPosts: [],
};

const postsReducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING:
            console.log("loading");
            return { ...state, isLoading: true };

        case END_LOADING:
            console.log("loaded");
            return { ...state, isLoading: false };
            
        case START_CREATING:
            console.log("creating");
            return { ...state, creating: true };

        case END_CREATING:
            console.log("created");
            return {...state, creating: false };

        case START_DELETING:
            console.log("deleting");
            return {...state, deleting: true };

        case END_DELETING:
            console.log("deleted");
            return {...state, deleting: false };

        case CREATE:
            return { posts: [action.payload, ...state.posts], ...state};
    
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
            };
        
        case FETCH_POST:
            return {
                ...state,
                userPosts: action.payload.data,
            }

        case DELETE:
            return {
                ...state, 
                posts: state.posts.filter((post) => post._id !== action.payload),
                userPosts: state.userPosts.filter((post) => post._id !== action.payload),
            };

        case UPDATE_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post._id === action.payload._id) {
                        return action.payload
                    }
                    return post;
                }),
            };

        default:
            return state;
    }
};

export default postsReducer;