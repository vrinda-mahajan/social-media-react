import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    token:null||localStorage.getItem("token"),
    user:null||JSON.parse(localStorage.getItem("user")),
    authStatus:"idle",
    error:''
}   

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(userDetails, {rejectWithValue})=>{
        try{
            const {data} = await axios.post("/api/auth/login",userDetails);
            return data;
        }
        catch(error){
            return rejectWithValue(error.response.data.errors[0])
        }
    }
)

export const signupUser = createAsyncThunk("auth/signupUser",async(userDetails,{rejectWithValue})=>{
    try{
        const {data} = await axios.post("/api/auth/signup",userDetails);
        return data;
    }
    catch(error) {
        return rejectWithValue(error.response.data.errors[0]);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logoutUser:()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Logged out!")
            return {token:null,user:null}
        }
    },
    extraReducers: {
        [loginUser.pending]: (state)=> {
            state.authStatus = "loading";
        },
        [loginUser.fulfilled]: (state,action) => {
            state.authStatus= "success";
            state.token=action.payload.encodedToken;
            state.user = action.payload.foundUser;
            localStorage.setItem("token",state.token);
            localStorage.setItem("user",JSON.stringify(state.user));
            toast.success("Logged in Successfully")
        },
        [loginUser.rejected]: (state,action) => {
            state.authStatus="rejected";
            state.error = action.payload;
            toast.error(`${state.error}`);
        },
        
        [signupUser.pending]: (state) => {
            state.authStatus = "loading";
        },
        [signupUser.fulfilled]: (state,action) => {
            state.authStatus= "success";
            state.token=action.payload.encodedToken;
            state.user=action.payload.createdUser;
            localStorage.setItem("token",state.token);
            localStorage.setItem("user",JSON.stringify(state.user));
            toast.success("Signed up Successfully");
        },
        [signupUser.rejected]: (state,action) => {
            state.authStatus="rejected";
            state.error = action.payload;
            toast.error(`${state.error}`);
        },
    }
})

export const {logoutUser} = authSlice.actions;

export default authSlice.reducer;
