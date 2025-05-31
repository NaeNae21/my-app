import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const mockComments = {
  abc123: [
    {
      id: 'c1',
      author: 'commenter1',
      body: `React’s declarative nature changed how I think about UI. Before, I had to worry about what changed and how to update the DOM manually. Now, I just describe what I want and React handles the rest. I also love how reusable and composable components make collaboration easier.`,
      ups: 10
    },
    {
      id: 'c2',
      author: 'commenter2',
      body: `When I started with React, I was confused about state and props. But after watching a few tutorials and building a small todo app, it started making sense. Now I can’t imagine going back to plain JS for UI work. Context and hooks were a game changer for me.`,
      ups: 7
    }
  ],
  def456: [
    {
      id: 'c3',
      author: 'reduxFan',
      body: `Redux Toolkit really cleaned up my code. I used to write so much boilerplate, but now everything feels simpler. I especially love createSlice and how reducers and actions are generated together. Plus, using Immer to write immutable logic as if it’s mutable is *chef’s kiss*.`,
      ups: 15
    }
  ]
};


export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ postId, permalink }) => {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
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
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commentsByPostId[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export default commentsSlice.reducer;