import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ postId, permalink }) => {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }

    const json = await response.json();
    
    const comments =  json[1].data.children.map((comment) => ({
      id: comment.data.id,
      author: comment.data.author,
      body: comment.data.body,
      ups: comment.data.ups,
    }));

    return { postId, comments };
  }
);


const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        commentsByPostId: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchComments.pending, (state, action) => {
        const postId = action.meta.arg.postId;
        state.commentsByPostId[postId] = {
          comments: [],
          status: 'loading',
          error: null,
        };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.commentsByPostId[postId] = {
          comments,
          status: 'succeeded',
          error: null,
        };
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        state.commentsByPostId[postId] = {
          comments: [],
          status: 'failed',
          error: action.error.message,
        };
      })
    }
});

export default commentsSlice.reducer;