import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    token:localStorage.getItem("token")||null,
    user:JSON.parse(localStorage.getItem("user"))||null,
    authStatus:"idle",
    error:''
}   

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(userDetails, {rejectWithValue})=>{
        try{
            const {data} = await axios.post("/api/auth/login",userDetails);
            localStorage.setItem("token",data.encodedToken);
            localStorage.setItem("user",JSON.stringify(data.foundUser));
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
        localStorage.setItem("token",data.encodedToken);
        localStorage.setItem("user",JSON.stringify(data.createdUser));
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
