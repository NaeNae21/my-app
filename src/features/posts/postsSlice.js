import { createSlice } from "@reduxjs/toolkit";

const mockPosts = [
  {
    id: 'abc123',
    title: 'Why React is Awesome',
    content: 'React is a powerful library for building user interfaces...',
    author: 'dev_dan',
    ups: 123,
    num_comments: 45,
    permalink: '/r/reactjs/comments/abc123/why_react_is_awesome/',
  },
  {
    id: 'def456',
    title: 'Understanding Redux Toolkit',
    content: 'Redux Toolkit simplifies state management in React...',
    author: 'redux_rachel',
    ups: 456,
    num_comments: 78,
    permalink: '/r/reactjs/comments/def456/understanding_redux_toolkit/',
  }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: mockPosts,
        status: 'idle',
        error: null
    },
    reducers: {

    }
});

export default postsSlice.reducer;