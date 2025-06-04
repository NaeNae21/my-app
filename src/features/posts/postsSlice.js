import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const mockPosts = [
  {
    data: {
      id: "abc123",
      title: "Check out my new React project!",
      author: "devgirl123",
      ups: 120,
      selftext: "Just finished building a to-do app with hooks and context.",
      permalink: "/r/reactjs/comments/abc123/check_out_my_new_react_project/",
      url: "https://www.reddit.com/r/reactjs/comments/abc123/check_out_my_new_react_project/",
      subreddit: "reactjs",
      num_comments: 14,
      preview: {
        images: [
          {
            source: {
              url: "../public/stock-image.jpg"
            }
          }
        ]
      },
      is_gallery: false,
      media_metadata: null
    }
  },
  {
    data: {
      id: "def456",
      title: "Need help with useEffect cleanup",
      author: "hookedonhooks",
      ups: 89,
      selftext: "I'm seeing a memory leak warning — what might be going wrong?",
      permalink: "/r/reactjs/comments/def456/need_help_with_useeffect_cleanup/",
      url: "https://www.reddit.com/r/reactjs/comments/def456/need_help_with_useeffect_cleanup/",
      subreddit: "reactjs",
      num_comments: 32,
      preview: null,
      is_gallery: false,
      media_metadata: null
    }
  },
  {
    data: {
      id: "ghi789",
      title: "Dark mode toggle built with Tailwind!",
      author: "themingMaster",
      ups: 213,
      selftext: "",
      permalink: "/r/reactjs/comments/ghi789/dark_mode_toggle_built_with_tailwind/",
      url: "https://www.reddit.com/r/reactjs/comments/ghi789/dark_mode_toggle_built_with_tailwind/",
      subreddit: "reactjs",
      num_comments: 45,
      preview: {
        images: [
          {
            source: {
              url: "../public/stock-image.jpg"
            }
          }
        ]
      },
      is_gallery: false,
      media_metadata: null
    }
  },
  {
    data: {
      id: "jkl012",
      title: "Just learned about useReducer!",
      author: "newbieCoder",
      ups: 33,
      selftext: "Reducers make state logic so much cleaner. Highly recommend.",
      permalink: "/r/reactjs/comments/jkl012/just_learned_about_usereducer/",
      url: "https://www.reddit.com/r/reactjs/comments/jkl012/just_learned_about_usereducer/",
      subreddit: "reactjs",
      num_comments: 8,
      preview: null,
      is_gallery: false,
      media_metadata: null
    }
  },
  {
    data: {
      id: "mno345",
      title: "My first image gallery in React!",
      author: "galleryGal",
      ups: 198,
      selftext: "Built this with CSS grid and React state.",
      permalink: "/r/reactjs/comments/mno345/my_first_image_gallery_in_react/",
      url: "https://www.reddit.com/r/reactjs/comments/mno345/my_first_image_gallery_in_react/",
      subreddit: "reactjs",
      num_comments: 20,
      preview: {
        images: [
          {
            source: {
              url: "../public/stock-image.jpg"
            }
          }
        ]
      },
      is_gallery: true,
      media_metadata: {
        "abc": { s: { u: "../public/stock-image.jpg" } },
        "def": { s: { u: "../public/stock-image.jpg" } }
      }
    }
  },
  {
    data: {
      id: "pqr678",
      title: "Crossposted: ReactConf Highlights",
      author: "eventRecapBot",
      ups: 55,
      selftext: "",
      permalink: "/r/reactjs/comments/pqr678/crossposted_reactconf_highlights/",
      url: "https://www.reddit.com/r/reactjs/comments/pqr678/crossposted_reactconf_highlights/",
      subreddit: "reactjs",
      num_comments: 4,
      preview: {
        images: [
          {
            source: {
              url: "../public/stock-image.jpg"
            }
          }
        ]
      },
      is_gallery: false,
      media_metadata: null,
      crosspost_parent: "t3_zyx987"
    }
  },
  {
    data: {
      id: "stu901",
      title: "Another crosspost you should skip",
      author: "metaPoster",
      ups: 12,
      selftext: "Not original content.",
      permalink: "/r/reactjs/comments/stu901/another_crosspost_you_should_skip/",
      url: "https://www.reddit.com/r/reactjs/comments/stu901/another_crosspost_you_should_skip/",
      subreddit: "reactjs",
      num_comments: 3,
      preview: null,
      is_gallery: false,
      media_metadata: null,
      crosspost_parent: "t3_abcd1234"
    }
  }
];

const USE_MOCK = false;

const extractGalleryImages = (media_metadata) => {
  return Object.values(media_metadata).map((item) =>
    item.s.u.replace(/&amp;/g, '&')
  );
};


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit = 'reactjs') => {
    if (USE_MOCK) {
      return mockPosts;
    }

    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();

    console.log(`Children`, json.data.children);

    return json.data.children
    .filter(post => !post.data.crosspost_parent)
    .map(post => {
      return {
        id: post.data.id,
        title: post.data.title,
        author: post.data.author,
        ups: post.data.ups,
        selftext: post.data.selftext,
        permalink: post.data.permalink,
        url: post.data.url.replace(/&amp;/g, '&'),
        subreddit: post.data.subreddit,
        num_comments: post.data.num_comments,
        image: post.data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') || null,
        gallery: post.data.is_gallery,
        gallery_images: post.data.is_gallery && post.data.media_metadata ? extractGalleryImages(post.data.media_metadata) : null,
      }
    });
  }
);

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (query) => {
    const url = `https://www.reddit.com/r/${query}.json`;
    const response = await fetch(url);
    const json = await response.json();

    console.log('search results:', json.data.children);

    return json.data.children
    .filter(post => !post.data.crosspost_parent)
    .map((post) => ({
      id: post.data.id,
      title: post.data.title,
      author: post.data.author,
      ups: post.data.ups,
      selftext: post.data.selftext,
      permalink: post.data.permalink,
      url: post.data.url.replace(/&amp;/g, '&'),
      subreddit: post.data.subreddit,
      num_comments: post.data.num_comments,
      image: post.data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') || null,
      gallery: post.data.is_gallery,
      gallery_images: post.data.is_gallery && post.data.media_metadata ? extractGalleryImages(post.data.media_metadata) : null,
    }))
  }
)


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
        state.posts = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(searchPosts.pending, (state) => {
        state.status = 'loading';
        state.posts = [];
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export default postsSlice.reducer;