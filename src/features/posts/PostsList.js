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

    if (postStatus === 'loading') return <p>Loading Posts...</p>
    if (postStatus === 'failed') return <p>Failed to Load Posts.</p>

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
                        <p className="post-content">{truncate(post.selftext, 100)}
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