
import { END_UPDATING, FOLLOW, SET_FRIENDS, SET_ONLINE_USER, SET_RECOMMENT_FRIENDS, SET_USER, START_UPDATING, UNFOLLOW, UPDATE_USER } from '../constants/actionTypes';

const initState = {
    isUpdating: false,
    userData: JSON.parse(localStorage.getItem('profile')),
    recommentFrds: [],
    friends: [],
    onlineUsers: []
};


const authReducer = (state = initState,action) => {
    switch (action.type) {
        case START_UPDATING:
            return { ...state, isUpdating: true };
    
        case END_UPDATING:
            return { ...state, isUpdating: false };
            
        case UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, userData: action?.data }

        case SET_USER:
            return { ...state, userData: action?.data }

        case FOLLOW:
            console.log("follow user");
            return {
                ...state,
                userData: {...state.userData, result: 
                    {...state.userData.result, followings: 
                        [...state.userData.result.followings, action.payload ]
                    } 
                } 
            }

        case UNFOLLOW:
            return {
                ...state,
                userData: {...state.userData, result:
                    {...state.userData.result, followings:
                        state.userData.result.followings.filter((id) => id !== action.payload)
                    }
                }
            }
        
        case SET_RECOMMENT_FRIENDS: {
            return {
                ...state,
                recommentFrds: action.payload,
            }
        }

        case SET_FRIENDS: {
            return {
                ...state,
                friends: action.payload,
            }
        }

        case SET_ONLINE_USER:
            return {
                ...state,
                onlineUsers: action.payload,
            }

        default:
            return state;
    }
};

export default authReducer;