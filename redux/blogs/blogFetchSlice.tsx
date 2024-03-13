import { BlogFetchAllState } from "@/models/states/blogFetchAllState";
import blogsecure from "@/services/blogSecure";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchAllBlogs = createAsyncThunk(
    "blogs/fetch_all",
    async (_, { rejectWithValue }) => { // Removed unused 'id' parameter
        try {
            const response = await blogsecure.get(`blogs/fetch_all`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue((error as AxiosError).response?.data);
            } else {
                console.log(error);
                throw error;
            }
        }
    }
)

export const fetchById= createAsyncThunk(
    "blogs/fetch_By_Id",
    async (id : number,{rejectWithValue} )=>{
        try {
            const response = await blogsecure.get(`blogs/${id}`)
            return response.data;
        }catch(error){
            if (axios.isAxiosError(error)){
                return rejectWithValue ((error as AxiosError).response?.data);
            }else{
                console.log(error);
                throw error;
            }
        }
    }
)

export 

const initialState: BlogFetchAllState = {
    blogs: null,
    loading: false,
    error: null
}

export const blogFetchSlice = createSlice({
    name: 'blogsFetchAll',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blogs = action.payload;
            })
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                // Handle rejected case if necessary
                state.blogs = null;
                state.error  = action.payload;
                state.loading = false;
            });
    }
});

export const selectBlogById = (state:  BlogFetchAllState , blogId: number) => {
    if (state.blogs) {
        return state.blogs.find((blog) => blog.id === blogId);
    }
    return null;
};



export default blogFetchSlice.reducer;
