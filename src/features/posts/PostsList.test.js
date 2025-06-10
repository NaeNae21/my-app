// PostsList.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import PostsList from './PostsList';
import * as postsSlice from './postsSlice'; // to spy on searchPosts
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';


const initialPosts = [
  {
    id: '1',
    title: 'First Post',
    author: 'user1',
    num_comments: 10,
    ups: 100,
    selftext: 'Text content',
    image: 'https://example.com/image.jpg',
  },
  {
    id: '2',
    title: 'Second Post',
    author: 'user2',
    num_comments: 5,
    ups: 50,
    selftext: '',
    image: '',
  },
];

describe('PostsList Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
      preloadedState: {
        posts: {
          posts: initialPosts,
          status: 'succeeded',
          error: null,
        },
      },
    });
  });

  test('renders post cards correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostsList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Top Posts')).toBeInTheDocument();
    expect(screen.getAllByText('First Post')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Second Post')[0]).toBeInTheDocument();

  });

  test('dispatches searchPosts when search is submitted', async () => {
    const spy = jest.spyOn(postsSlice, 'searchPosts').mockImplementation(() => () => {});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostsList />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search by subreddit/i);
    fireEvent.change(input, { target: { value: 'gardening' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('gardening');
    });

    spy.mockRestore();
  });
});
