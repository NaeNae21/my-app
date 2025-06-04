import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsList from './features/posts/PostsList';
import PostDetail from './pages/PostDetail';
import logo from './styles/reddit.png';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className='catamaran'><img src={logo} alt="logo" className='logo'></img>redditish</h1>
        <p className='about'>A Reddit Clone for React/Redux Practice</p>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
        <footer>© Jenae Caporale 2025</footer>
      </div>
    </Router>
    
  );
}

export default App;
