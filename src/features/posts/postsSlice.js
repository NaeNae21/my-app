import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const mockPosts = [
  {
    id: 'abc123',
    title: 'Why React is Awesome',
    author: 'user123',
    ups: 120,
    num_comments: 2,
    selftext: `React is awesome because it allows developers to build interactive user interfaces using a declarative approach. You can create components that encapsulate both logic and presentation, making your app modular and maintainable. The virtual DOM ensures efficient updates, and features like hooks and context provide a powerful toolset for managing state and side effects. Whether you're building a small widget or a large-scale application, React provides the flexibility and performance you need.`
  },
  {
    id: 'def456',
    title: 'Redux Toolkit Tips',
    author: 'dev_guy',
    ups: 85,
    num_comments: 1,
    selftext: `Redux Toolkit simplifies working with Redux by abstracting away much of the boilerplate. Instead of writing separate action types, action creators, and reducers, you can use "slices" to keep logic together. It also comes with built-in support for thunk middleware and devtools, making it easier to manage async actions and debug your app. When combined with createAsyncThunk and Immer, your state logic becomes concise and expressive, improving both readability and maintainability.`
  },
  {
    id: 'ghi789',
    title: 'How I Built My First Front-End App',
    author: 'beginner_coder',
    ups: 42,
    num_comments: 0,
    selftext: `When I built my first front-end app, I had no idea where to start. I began with plain HTML and CSS, but quickly ran into limitations. Then I discovered React, and everything changed. Breaking down the UI into components helped me stay organized. I used React Router for navigation and eventually learned about Redux for managing complex state. It was a challenging journey, but each step gave me more confidence. Now, I'm working on my second project with a much clearer understanding of how everything fits together.`
  }
];


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit = 'reactjs') => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();

    return json.data.children.map((post) => ({
      id: post.data.id,
      title: post.data.title,
      author: post.data.author,
      ups: post.data.ups,
      selftext: post.data.selftext,
      permalink: post.data.permalink,
      subreddit: post.data.subreddit,
      num_comments: post.data.num_comments,
      image: post.data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') || null,
    }));
  }
);


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export default postsSlice.reducer;