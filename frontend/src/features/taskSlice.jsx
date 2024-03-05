import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

//API URL
const addTaskUrl = "https://nodejs-todoapp-asns.onrender.com/api/v1/tasks/new";
const allTasksUrl = "https://nodejs-todoapp-asns.onrender.com/api/v1/tasks/all";
const updateTasksUrl = "https://nodejs-todoapp-asns.onrender.com/api/v1/tasks/";
const deleteTasksUrl = "https://nodejs-todoapp-asns.onrender.com/api/v1/tasks/";

//CREATE TASK ASYNC THUNK
export const createTaskAsync = createAsyncThunk(
    "task/create",
    async (formData) => {
        try {
            const response = await axios.post(addTaskUrl, formData, { withCredentials: true });
            toast.success(response.data.msg);
            console.log(response.data.msg);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
);

//GET ALL ASYNC THUNK
export const getAllTasksAsync = createAsyncThunk("task/all", async () => {
        try {
            const response = await axios.get(allTasksUrl, { withCredentials: true });
            // toast.success(response.data.msg);
            console.log(response.data);
            return response.data;
        } catch (error) {
            toast.error(error.response.data);
        }
    }
);


//UPDATE TASK ASYNC THUNK
export const updateTasksAsync = createAsyncThunk("task/update", async (id) => {
    try {
        const response = await axios.put(`${updateTasksUrl}/${id}`, { withCredentials: true });
        toast.success(response.data.msg);
        console.log(response.data.msg);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);
    }
}
);

//DELETE TASK ASYNC THUNK
export const deleteTasksAsync = createAsyncThunk("task/delete", async (id) => {
    try {
        const response = await axios.delete(`${deleteTasksUrl}/${id}`, { withCredentials: true });
        toast.success(response.data.msg);
        // console.log(response.data.msg);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);
    }
}
);



// INITIAL STATE
const initialState = {
    createTask: null,
    tasks: [],
    loading: false,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // SIGN UP ADD CASE
            .addCase(createTaskAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.createTask = action.payload;
            })

            // LOGIN ADD CASE
            .addCase(getAllTasksAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllTasksAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload?.tasks;
            })
    },
});

export default authSlice.reducer;
