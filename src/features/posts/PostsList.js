import React from "react";
import { useSelector } from "react-redux";

const PostsList = () => {
    const posts = useSelector((state) => state.posts.posts);

    return (
        <>
            <h2>Top Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    <div className="post-header">
                        <h3>{post.title}</h3>
                        <p>{post.ups}</p>
                    </div>
                    <p className="post-content">{post.content}<a href={post.permalink}>Read more</a></p>
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