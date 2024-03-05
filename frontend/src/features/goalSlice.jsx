import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";


// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));


// INITIAL STATE
const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

//API URL
const createGoalUrl = "http://localhost:4000/api/v1/goals/";
const getGoalsUrl = "http://localhost:4000/api/v1/goals/";
const deleteGoalsUrl = "http://localhost:4000/api/v1/goals/";
const updateGoalsUrl = "http://localhost:4000/api/v1/goals/";


// Create a goal
export const createGoalAsync = createAsyncThunk("goal/create", async (formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.post(createGoalUrl, formData, config);
        console.log(response.data);
        return response.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get all goals
export const getGoalsAsync = createAsyncThunk("goals/all", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(getGoalsUrl, config);
        return response.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


// Delete goal
export const deleteGoalsAsync = createAsyncThunk("goals/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.delete(deleteGoalsUrl + id, config);
        return response.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update goal
export const updateGoalsAsync = createAsyncThunk("goals/update", async (data, thunkAPI) => {
    try {
        const { goalId, text } = data;
        console.log(goalId, text);
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put(updateGoalsUrl + goalId, {text}, config);
        console.log(response.data);
        return response.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


const goalSlice = createSlice({
    name: "goalSlice",
    initialState,
    reducers: {
        resetGoals: (state) => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(createGoalAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createGoalAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload)
            })
            .addCase(createGoalAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })



            .addCase(getGoalsAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getGoalsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;

            })
            .addCase(getGoalsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })



            .addCase(deleteGoalsAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteGoalsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
            })
            .addCase(deleteGoalsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


        // .addCase(updateGoalsAsync.pending, (state, action) => {
        //     state.isLoading = true;
        // })
        // .addCase(updateGoalsAsync.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     // state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
        // })
        // .addCase(updateGoalsAsync.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.message = action.payload;
        // })
    },
});

export const { resetGoals } = goalSlice.actions;
export default goalSlice.reducer;


