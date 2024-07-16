import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

// Thunk action creator to fetch comments from the server
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(baseUrl + "comments");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

// Thunk action creator to post a comment to the server
export const postComment = createAsyncThunk(
  "comments/postComment",
  async (payload, { dispatch, getState }) => {
    // Simulate a server response delay with setTimeout
    setTimeout(() => {
        // Get the current state of comments
      const { comments } = getState(); 
      // Add the current date to the payload
      payload.date = new Date().toISOString(); 
      // Set the ID based on the length of the comments array
      payload.id = comments.commentsArray.length; 
      // Dispatch the addComment action with the payload
      dispatch(addComment(payload)); 
    }, 2000); 
  }
);

// Create a slice of the state for comments
const commentsSlice = createSlice({
  name: "comments", // Name  the slice
  initialState: { isLoading: true, errMess: null, commentsArray: [] }, // Initial state
  reducers: {
    // Reducer to add a comment to the state
    addComment: (state, action) => {
        // Use the mutating method to add the new comment
      state.commentsArray.push(action.payload); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {// Set loading state to true when fetch starts
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false when fetch is successful
        state.errMess = null; // Clear any error messages
        state.commentsArray = action.payload; // Update the state with fetched comments
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false when fetch fails
        state.errMess = action.error ? action.error.message : "Fetch failed"; // Set error message
      });
  },
});

export const { addComment } = commentsSlice.actions; 
export const commentsReducer = commentsSlice.reducer; 
