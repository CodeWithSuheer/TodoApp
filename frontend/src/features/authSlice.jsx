import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";


// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));


// INITIAL STATE
const initialState = {
    user: user ? user : null,
    isError: null,
    isSuccess: null,
    isLoading: null,
    message: ''
};

//API URL
const signupUrl = "http://localhost:4000/api/v1/auth/register";
const loginUrl = "http://localhost:4000/api/v1/auth/login";


// Register Function
export const createuserAsync = createAsyncThunk("user/create", async (formData, thunkAPI) => {
    try {
        const response = await axios.post(signupUrl, formData);
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Login Function
export const loginUserAsync = createAsyncThunk("user/login", async (formData, thunkAPI) => {
    try {
        const response = await axios.post(loginUrl, formData);
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout Function
export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
    localStorage.removeItem("user");
})


const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createuserAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createuserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(createuserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })


            .addCase(loginUserAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })


            .addCase(logoutUserAsync.fulfilled, (state, action) => {
                state.user = null;
            })
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
