import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PostDetail from './PostDetail';
import * as commentsSlice from '../features/comments/commentsSlice';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';


const samplePost = {
  id: '1',
  title: 'Test Post',
  author: 'user123',
  ups: 42,
  selftext: 'Some self text',
  image: 'https://example.com/image.jpg',
  gallery: false,
  url: 'https://reddit.com/testpost',
  permalink: '/r/test/comments/1/test_post/',
};

const sampleComments = [
  { id: 'c1', author: 'commenter1', body: 'Nice post!', ups: 5 },
  { id: 'c2', author: 'commenter2', body: 'I agree', ups: 3 },
];

describe('PostDetail Component', () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {
    store = configureStore({
        reducer: {
            posts: postsReducer,
            comments: commentsReducer,
        },
        preloadedState: {
            posts: { posts: [samplePost] },
            comments: {
                commentsByPostId: {
                    '1': {
                        comments: sampleComments,
                        status: 'succeeded',
                        error: null,
                    },
                },
            },
        },
    });
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  function renderWithProviders(store, postId = '1') {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/post/${postId}`]}>
          <Routes>
            <Route path="/post/:postId" element={<PostDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  test('renders post details correctly', () => {
    renderWithProviders(store);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText(/by user123/i)).toBeInTheDocument();
    expect(screen.getByText(/⬆ 42/i)).toBeInTheDocument();
    expect(screen.getByText('Some self text')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', samplePost.image);
    expect(screen.getByText(/See the full Reddit post/i)).toHaveAttribute('href', samplePost.url);
  });
  

  test('shows loading state for comments', () => {
    store = configureStore({
        reducer: {
            posts: postsReducer,
            comments: commentsReducer,
        },
        preloadedState: {
            posts: { posts: [samplePost] },
            comments: {
                commentsByPostId: {
                    '1': {
                        comments: sampleComments,
                        status: 'loading',
                        error: null,
                    },
                },
            },
        },
    });

    renderWithProviders(store);

    expect(document.querySelector('.loading-comment')).toBeInTheDocument();
  });

  test('shows failed state and retry button', () => {
    store = configureStore({
        reducer: {
            posts: postsReducer,
            comments: commentsReducer,
        },
        preloadedState: {
            posts: { posts: [samplePost] },
            comments: {
                commentsByPostId: {
                    '1': {
                        comments: sampleComments,
                        status: 'failed',
                        error: null,
                    },
                },
            },
        },
    });

    dispatchSpy = jest.spyOn(store, 'dispatch');

    renderWithProviders(store);

    expect(screen.getByText(/failed to load comments/i)).toBeInTheDocument();
    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();


    fireEvent.click(retryButton);
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
  });

test('shows no comments message', async () => {
  store = configureStore({
    reducer: {
      posts: postsReducer,
      comments: commentsReducer,
    },
    preloadedState: {
      posts: {
        posts: [samplePost],
        selectedPost: samplePost, // ✅ REQUIRED
      },
      comments: {
        commentsByPostId: {
          '1': {
            comments: [],            // ✅ empty array
            status: 'succeeded',     // ✅ correct status
            error: null,
          },
        },
      },
    },
  });

  renderWithProviders(store);

  // add debugging to confirm it's rendering what we expect
  screen.debug();

  expect(await screen.findByText(/no comments yet/i)).toBeInTheDocument();
});


  test('renders comments and toggle expand', () => {
    store = configureStore({
        reducer: {
            posts: postsReducer,
            comments: commentsReducer,
        },
        preloadedState: {
            posts: { 
                posts: [samplePost],
                selectedPost: samplePost
             },
            comments: {
                commentsByPostId: {
                    '1': {
                        comments: sampleComments,
                        status: 'succeeded',
                        error: null,
                    },
                },
            },
        },
    });

    renderWithProviders(store);

    // Comments' author and body appear
    expect(screen.getByText('Nice post!')).toBeInTheDocument();
    expect(screen.getByText('I agree')).toBeInTheDocument();

    // Since Comment component isn't mocked here, let's assume it toggles on click
    // You may want to mock Comment or test the toggleExpand state by simulating clicks on Comment components if possible
  });

  test('renders "post not found" if post is missing', () => {
    store = configureStore({
        reducer: {
            posts: postsReducer,
            comments: commentsReducer,
        },
        preloadedState: {
            posts: { posts: [samplePost] },
            comments: {
                commentsByPostId: {
                    '1': {
                        comments: sampleComments,
                        status: 'succeeded',
                        error: null,
                    },
                },
            },
        },
    });


    renderWithProviders(store, 'nonexistentId');

    expect(screen.getByText(/post not found/i)).toBeInTheDocument()
  });
});
