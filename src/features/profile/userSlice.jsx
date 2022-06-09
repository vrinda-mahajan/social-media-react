import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    allUsers:[],
    bookmarks:[],
    usersStatus:'idle',
    usersError: null,
}

export const getAllUsers = createAsyncThunk("users/getAllUsers",
    async(_,{rejectWithValue}) => {
        try{
            const res = await axios.get("/api/users");
            return res.data.users;
        }catch(err){
            console.log(err)
            return rejectWithValue(err.response.data.errors[0])
        }
    }
)

export const editUser = createAsyncThunk("users/editUser",
    async(userDetails,{rejectWithValue}) => {
        const token = localStorage.getItem("token")
        try{
            const res = await axios.post(
                "/api/users/edit",
                {userDetails},
                {headers:{authorization:token}})
            return res.data.user;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    }
)

export const followUser = createAsyncThunk("users/followUser",
    async(followUserId,{rejectWithValue})=>{
        const token = localStorage.getItem("token")
        try {
            const {data: {user,followUser}} = await axios.post(
                `/api/users/follow/${followUserId}`,
                {},
                {headers:{authorization:token}})
            return {user,followUser}
        }catch(err){
            console.log(err)
            rejectWithValue(err.response.data)
        }
    })

export const unfollowUser = createAsyncThunk ("users/unfollowUser",
    async(followUserId,{rejectWithValue})=>{
        const token = localStorage.getItem('token')
        try {
            const {data:{user,followUser}} = axios.post(
                `/api/users/unfollow/${followUserId}`,
                {},
                {headers:{authorization:token}})
            return {user,followUser}
        } catch (err) {
            rejectWithValue(err.response.data)
        }
    })

export const getBookmarks = createAsyncThunk ("users/getBookmarks",
    async(_,{rejectWithValue})=>{
        const token = localStorage.getItem("token");
        try{
            const {data:{bookmarks}} = await axios.get(
                `/api/users/bookmark`,
                {},
                {headers:{authorization:token}})
            return bookmarks;
        }catch (err) {
            return rejectWithValue(err.response.data)
        }
    })
export const addBookmark = createAsyncThunk ("users/addBookmark",
    async(postId,{rejectWithValue})=>{
        const token = localStorage.getItem("token");
        try{
            const {data:{bookmarks}} = await axios.post(
                `/api/users/bookmark/${postId}`,
                {},
                {headers:{authorization:token}})
            return bookmarks
        }catch (err) {
            return rejectWithValue(err.response.data)
        }
    })

export const removeBookmark = createAsyncThunk ("users/removeBookmark",
    async(postId,{rejectWithValue})=>{
        const token = localStorage.getItem("token");
        try{
            const {data:{bookmarks}} = await axios.post(
                `/api/users/remove-bookmark/${postId}`,
                {},
                {headers:{authorization:token}})
            return bookmarks
        }catch (err) {
            return rejectWithValue(err.response.data)
        }
    })
const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {},
    extraReducers:{
        [getAllUsers.pending]: (state) => {
            state.usersStatus = 'loading'
        },
        [getAllUsers.fulfilled]: (state,action) => {
            state.usersStatus ='success'
            state.allUsers =action.payload;
        },
        [getAllUsers.rejected]: (state,action) => {
            state.usersStatus ='rejected';
            state.usersError =action.payload;
        },
        [editUser.pending]: (state) => {
            state.usersStatus = 'loading'
        },
        [editUser.pending]: (state,action) => {
            const editedUser = action.payload;
            const editedUserIndex = state.allUsers.findIndex(({_id})=>_id===editedUser._id);
            state.allUsers[editedUserIndex] = action.payload;
        },
        [editUser.rejected]: (state,action) => {
            state.usersStatus ='rejected';
            state.usersError =action.payload;
        },
        [followUser.pending]: (state) => {
            state.usersStatus = 'pending';
        },
        [followUser.fulfilled]: (state,action) => {
            state.usersStatus ='success';
            const currentUser = action.payload.user;
            const currentUserIndex = state.allUsers.findIndex(({_id})=> _id === currentUser._id);
            state.allUsers[currentUserIndex] = action.payload.user;

            const followedUser = action.payload.followUser;
            const followedUserIndex = state.allUsers.findIndex(({_id})=> _id === followedUser._id);
            state.allUsers[followedUserIndex] = action.payload.followUser;
        },
        [followUser.rejected]: (state,action) => {
            state.usersStatus = 'rejected';
            state.usersError = action.payload;
        },
        [unfollowUser.pending]: (state) => {
            state.usersStatus = 'pending';
        },
        [unfollowUser.fulfilled]: (state,action) => {
            state.usersStatus ='success';
            const currentUser = action.payload.user;
            const currentUserIndex = state.allUsers.findIndex(({_id})=> _id === currentUser._id);
            state.allUsers[currentUserIndex] = action.payload.user;

            const followedUser = action.payload.followUser;
            const followedUserIndex = state.allUsers.findIndex(({_id})=> _id === followedUser._id);
            state.allUsers[followedUserIndex] = action.payload.followUser;
        },
        [unfollowUser.rejected]: (state,action) => {
            state.usersStatus = 'rejected';
            state.usersError = action.payload;
        },

        [getBookmarks.pending]: (state) => {
            state.usersStatus = "loading";
        },
        [getBookmarks.fulfilled]: (state, action) => {
            state.usersStatus = "success";
            state.bookmarks = action.payload;
        },
        [getBookmarks.rejected]: (state, action) => {
            state.usersStatus = "rejected";
            state.usersError = action.payload.errors;
        },
        [addBookmark.pending]: (state) => {
            state.usersStatus = "loading";
        },
        [addBookmark.fulfilled]: (state, action) => {
            state.usersStatus = "success";
            state.bookmarks = action.payload;
        },
        [addBookmark.rejected]: (state, action) => {
            state.usersStatus = "rejected";
            state.usersError = action.payload.err;
        },
        [removeBookmark.pending]: (state) => {
            state.usersStatus = "loading";
        },
        [removeBookmark.fulfilled]: (state, action) => {
            state.usersStatus = "success";
            state.bookmarks = action.payload;
        },
        [removeBookmark.rejected]: (state, action) => {
            state.usersStatus = "rejected";
            state.usersError = action.payload.errors;
        },
    }
})

const {reducer} = usersSlice;

export default reducer
