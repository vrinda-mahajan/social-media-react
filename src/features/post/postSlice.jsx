import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allPosts:[],
    postStatus:'idle',
    postError:null,
}

export const getAllPosts = createAsyncThunk("posts/getAllPosts",
    async(_,{rejectWithValue}) => {
        try {
            const {data:{posts}} = await axios.get("/api/posts");
            return posts;
        } catch (err) {
            console.log(err)
            rejectWithValue(err.response.data)
        }
    })

export const createPost = createAsyncThunk("posts/createPost",
    async(postData,{rejectWithValue}) => {
        const token = localStorage.getItem("token")
        try {
            const {data:{posts}} = await axios.post(
                "/api/posts",
                {postData},
                {headers:{authorization:token}})
            return posts;
        }catch(err){
            rejectWithValue(err.response.data)
        }
    }
)

export const editPost = createAsyncThunk("posts/editPost",
    async(postData,{rejectWithValue}) => {
        const token = localStorage.getItem("token")
        try {
            const {data:{posts}} = await axios.post(
                `/api/posts/edit/${postData._id}`,
                {postData},
                {headers:{authorization:token}})
            return posts;
        }catch(err){
            rejectWithValue(err.response.data)
        }
    }
)

export const deletePost = createAsyncThunk("posts/deletePost",
    async(postId,{rejectWithValue}) => {
        const token = localStorage.getItem("token")
        try {
            const {data:{posts}} = await axios.delete(
                `/api/posts/${postId}`,
                {headers:{authorization:token}})
            return posts;
        }catch(err){
            rejectWithValue(err.response.data)
        }
    }
)

export const addComment = createAsyncThunk("posts/addComment",
    async({postId,commentData},{rejectWithValue}) => {
        const token = localStorage.getItem("token")
        try {
            const {data:{comments}} = await axios.post(
                `/api/comments/add/${postId}`,
                {commentData},
                {headers:{authorization:token}})
            return {comments,postId};
        }catch(err){
            rejectWithValue(err.response.data)
        }
    }
)

export const deleteComment = createAsyncThunk("posts/deleteComment",
    async({postId,commentId},{rejectWithValue}) => {
        const token = localStorage.getItem("token")
        try {
            const {data:{comments}} = await axios.post(
                `/api/comments/delete/${postId}/${commentId}`,
                {},
                {headers:{authorization:token}})
            return {comments,postId};
        }catch(err){
            rejectWithValue(err.response.data)
        }
    }
)

export const likePost = createAsyncThunk("posts/likePost",

    async(postId,{rejectWithValue}) => {
        const token = await localStorage.getItem("token")
        try {
            const {data:{posts}} = await axios.post(
                `/api/posts/like/${postId}`,
                {},
                {headers:{authorization:token}})
            return posts;
        }catch(err){
            rejectWithValue(err.response.data)
        }
    }
)

export const dislikePost = createAsyncThunk("posts/dislikePost",

    async(postId,{rejectWithValue}) => {
        const token = await localStorage.getItem("token")
        try {
            const {data:{posts}} = await axios.post(
                `/api/posts/dislike/${postId}`,
                {},
                {headers:{authorization:token}})
            return posts;
        }catch(err){
            rejectWithValue(err.response.data)
        }
    }
)

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{},
    extraReducers: {
        [getAllPosts.pending] : (state) => {
            state.postStatus='loading';
        },
        [getAllPosts.fulfilled] : (state,action) => {
            state.postStatus='success';
            state.allPosts=action.payload
        },
        [getAllPosts.rejected] : (state,action) => {
            state.postStatus='rejected';
            state.postError=action.payload.errors;
        },
        [createPost.pending] : (state) => {
            state.postStatus='loading'
        },
        [createPost.fulfilled] : (state,action) => {
            state.postStatus='success';
            state.allPosts=action.payload
        },
        [createPost.rejected] : (state,action) => {
            state.postStatus='rejected';
            state.postError=action.payload.errors;
        },
        [editPost.pending] : (state) => {
            state.postStatus='loading'
        },
        [editPost.fulfilled] : (state,action) => {
            state.postStatus='success';
            state.allPosts=action.payload
        },
        [editPost.rejected] : (state,action) => {
            state.postStatus='rejected';
            state.postError=action.payload.errors;
        },
        [deletePost.pending] : (state) => {
            state.postStatus='loading'
        },
        [deletePost.fulfilled] : (state,action) => {
            state.postStatus='success';
            state.allPosts=action.payload
        },
        [deletePost.rejected] : (state,action) => {
            state.postStatus='rejected';
            state.postError=action.payload.errors;
        },
        [addComment.pending] : (state) => {
            state.postStatus='loading'
        },
        [addComment.fulfilled] : (state,action) => {
            const postIndex = state.allPosts.findIndex((post)=>post._id === action.payload.postId)
            state.allPosts[postIndex].comments=action.payload.comments
            state.postStatus='success';
        },
        [addComment.rejected] : (state,action) => {
            state.postStatus='rejected';
            state.postError=action.payload.errors;
        },
        [deleteComment.pending] : (state) => {
            state.postStatus='loading'
        },
        [deleteComment.fulfilled] : (state,action) => {
            state.postStatus='success';
            const postIndex = state.allPosts.findIndex((post)=>post._id === action.payload.postId)
            state.allPosts[postIndex].comments=action.payload.comments
        },
        [deleteComment.rejected] : (state,action) => {
            state.postStatus='rejected';
            state.postError=action.payload.errors;
        },
        [likePost.pending] : (state) => {
            state.postStatus='loading'
        },
        [likePost.fulfilled] : (state,action) => {
            state.postStatus='success';
            state.allPosts=action.payload
        },
        [likePost.rejected] : (state,action) => {
            state.postStatus='rejected';
            state.postError=action.payload.errors;
        },
        [dislikePost.pending] : (state) => {
            state.postStatus='loading'
        },
        [dislikePost.fulfilled] : (state,action) => {
            state.postStatus='success';
            state.allPosts=action.payload
        },
        [dislikePost.rejected] : (state,action) => {
            state.postStatus='rejected';
            state.postError=action.payload.errors;
        },

    }
})

const {reducer} = postSlice;

export default reducer
