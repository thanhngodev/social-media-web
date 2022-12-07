import { END_UPLOADING, START_UPLOADING } from '../constants/actionTypes';

const initState = {
    isUploading: false
};
const uploadReducer = (state = initState,action) => {
    switch (action.type) {
        case START_UPLOADING:
            return {...state, isUploading: true}

        case END_UPLOADING:
            return {...state, isUploading: false}
        default:
            return state;
    }
}

export default uploadReducer;