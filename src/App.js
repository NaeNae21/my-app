import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsList from './features/posts/PostsList';
import PostDetail from './pages/PostDetail';
import logo from './styles/reddit.png';

function App() {
  return (
    <Router>
      <div className="App">
        <h1><img src={logo} alt="logo" className='logo'></img>Redditish</h1>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
