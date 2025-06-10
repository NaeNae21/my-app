import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, searchPosts } from "./postsSlice";

const PostsList = () => {
    const [ searchTerm, setSearchTerm ] = useState('')
    const [erroredImages, setErroredImages] = useState({});
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);


    const handleImageError = (id) => {
        setErroredImages((prev) => ({ ...prev, [id]: true }));
    };

    function truncate(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            dispatch(searchPosts(searchTerm.trim()));
            setSearchTerm('');
        }
    };

    if (postStatus === 'loading') return <div className="loading">
        <h2>Top Posts</h2>
        <div className="loading-container">
            <div className="loading-post">
                <div className="loading-header">
                    <div className="loading-title shimmer"></div>
                    <div className="loading-ups shimmer"></div>
                </div>
                <div className="loading-content shimmer"></div>
                <hr className="loading-hr"/>
                <div className="loading-under-post">
                    <div className="loading-author shimmer"></div>
                    <div className="loading-comments shimmer"></div>
                </div>
            </div>
            <div className="loading-post">
                <div className="loading-header">
                    <div className="loading-title shimmer"></div>
                    <div className="loading-ups shimmer"></div>
                </div>
                <div className="loading-content shimmer"></div>
                <hr className="loading-hr"/>
                <div className="loading-under-post">
                    <div className="loading-author shimmer"></div>
                    <div className="loading-comments shimmer"></div>
                </div>
            </div>
        </div>
    </div>
    if (postStatus === 'failed') return <div className="failed">
        <p>Failed to Load Posts.</p>
        <button className="retry-button" onClick={() => dispatch(fetchPosts())}>Retry ↺</button>
        </div>

    return (
        <>
            <div className="search">
                <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Search by subreddit..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="submit-button" type="submit" onClick={handleSubmit}><img className="search-icon" src="../search-icon.png"></img></button>
            </div>

            <h2>Top Posts</h2>
            {posts.map((post) => {
                
                const isErrored = erroredImages[post.id];

                return (
                <div key={post.id} className="post-card">
                    <div className="post-header">
                        <h3 className="small-screen">{truncate(post.title, 25)}</h3>
                        <h3 className="large-screen">{truncate(post.title, 70)}</h3>
                        <p className="ups">⬆ {post.ups}</p>
                    </div>
                    <div className="truncated-post">
                        <div className="post-content">
                            {post.selftext && <p>{truncate(post.selftext, 100)}</p>}
                            {post.image && !isErrored ? <img className="post-image" 
                            src={post.image}
                            onError={() => handleImageError(post.id)}
                            ></img> : null}
                            {post.gallery && (
                              <div className="gallery">
                                {post.gallery_images.map((imgUrl, i) => (
                                    <img className="post-image" 
                                    key={i} 
                                    src={imgUrl}
                                    ></img>
                                ))}
                              </div>  
                            )}
                            <Link to={`/post/${post.id}`}>Read more →</Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="under-post">
                        <p>By {post.author}</p>
                        <p className="comments">💬 {post.num_comments}</p>
                    </div>
                </div>
            )})}
        </>
    );
};

export default PostsList;