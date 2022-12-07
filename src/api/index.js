import axios from "axios";
// const API = axios.create({ baseURL: 'http://localhost:5000/api' });
const API = axios.create({ baseURL: 'https://social-api-ct466.herokuapp.com/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

export const googleAccount = (formData) => API.post('/auth/create', formData);

export const upload = (data) => API.post('/upload', data);

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (postId, updated) => API.patch(`/posts/${postId}`, updated);
export const updateComments = (postId, comment) => API.patch(`/posts/${postId}/comments`, comment);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (id) => API.get(`/posts/${id}/many`);
export const fetchTimeline = () => API.get('/posts/timeline/all');

export const addComment = (newComment) => API.post('/comments', newComment);
export const getComments = (postId) => API.get(`/comments/${postId}`);
export const getReplies = (commentId) => API.get(`/comments/${commentId}/replies`);
export const likeComment = (commentId) => API.patch(`/comments/${commentId}/like`);

export const likePost = (id) => API.patch(`/posts/${id}/like`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const getUser = (id) => API.get(`/users/${id}/one`);
export const getRecommentFriends = (id) => API.get(`/users/${id}/recomments`);
export const follow = (id) => API.put(`/users/${id}/follow`);
export const unfollow = (id) => API.put(`/users/${id}/unfollow`);
export const getFriends = (id) => API.get(`/users/${id}/friends`);

export const createConversation = (receiver) => API.post('/conversations', receiver);
export const getConversations = (id) => API.get(`/conversations/${id}`);

export const getMessages = (id) => API.get(`/messages/${id}`);
export const createMessage = (newMessage) => API.post('/messages', newMessage);

export const addNotification = (newNotification) => API.post('/notifications', newNotification);
export const getNotification = (id) => API.get(`/notifications/${id}`);
export const getNotifications = () => API.get('/notifications');
export const readNotification = (id) => API.put(`/notifications/${id}`);