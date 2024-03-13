import { BlogPostData } from "@/models/BlogPost";
import { BlogCreateState } from "@/models/states/blogCreateState";

import blogsecure from "@/services/blogSecure";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";

export const createBlog = createAsyncThunk(
    "blogs/create",
    async (blog: BlogPostData, {rejectWithValue})=>{
        console.log(blog);
        try{
            const response = await blogsecure.post("/blogs/create", blog);
            return response.data;
        }catch(error:any){
            if(axios.isAxiosError(error)){
                return rejectWithValue((error as AxiosError).response?.data);
            }else{
                console.log(error);
                throw error;
            }
        }
    }
);



const initialState : BlogCreateState = {
    blog: null,
    loading: false,
    error : null
    
}


export const blogSlice = createSlice({
    name:'blogs',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(createBlog.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(createBlog.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.blog = action.payload;
            })
            .addCase(createBlog.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export default blogSlice.reducer;