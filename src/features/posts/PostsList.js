import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "./postsSlice";

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);

    function truncate(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    if (postStatus === 'loading') return <div className="loading">
        <h2>Top Posts</h2>
        <div className="loading-container">
            <div className="loading-post">
                <div className="loading-header">
                    <div className="loading-title shimmer"></div>
                    <div className="loading-ups shimmer"></div>
                </div>
                <div className="loading-content shimmer"></div>
                <hr/>
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
            <h2>Top Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    <div className="post-header">
                        <h3>{post.title}</h3>
                        <p>⬆ {post.ups}</p>
                    </div>
                    <div className="truncated-post">
                        <p className="post-content">
                            {post.selftext
                                ? truncate(post.selftext, 100)
                                : post.image
                                    ? <img className="post-image" src={post.image}/>
                                    : null}
                        </p>
                        <Link to={`/post/${post.id}`}>Read more →</Link>
                    </div>
                    <hr/>
                    <div className="under-post">
                        <p>By {post.author}</p>
                        <p>💬 {post.num_comments}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostsList;