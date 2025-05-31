import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../features/comments/Comment';
import { fetchComments } from '../features/comments/commentsSlice';

const PostDetail = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const commentStatus = useSelector((state) => state.comments.status);
    const [expandedComments, setExpandedComments] = useState([]);

    const comments = useSelector(
        (state) => state.comments.commentsByPostId[postId] || []
    );

    const permalink = useSelector((state) => state.posts.permalink)

    const post = useSelector((state) => state.posts.posts.find((post) => post.id === postId)
    );

    useEffect(() => {
        if (commentStatus === 'idle') {
            dispatch(fetchComments(postId, permalink));
        }
    }, [commentStatus, dispatch]);


    const toggleExpand = (commentId) => {
        setExpandedComments((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    }

    if (!post) {
        return <p>Post not found.</p>
    }

    return (
        <div>
            <div className='post-card'>
                <Link className='go-back' to="/">Go Back ↩</Link><h2 className='post-title'>{post.title}</h2>
                <div className='post-header'>
                    <p>by {post.author}</p>
                    <p>⬆ {post.ups}</p>
                </div>
                <hr/>
                <p>{post.selftext}</p>
            </div>

            <h3 className='comments-header'>Comments</h3>
            {commentStatus === 'loading' && <p>Loading Comments...</p>}
            {commentStatus === 'failed' && <p>Failed to Load Comments.</p>}
            {commentStatus === 'succeeded' && comments.length === 0 && <p>No comments yet.</p>}
            {comments.length > 0 &&
                comments.map((comment) => {
                    const isExpanded = expandedComments[comment.id];
                    return (
                        <Comment
                            key={comment.id}
                            author={comment.author}
                            body={comment.body}
                            ups={comment.ups}
                            isExpanded={isExpanded} 
                            onToggle={() => toggleExpand(comment.id)}
                        />
                    )
                })}
        </div>
    )
}

export default PostDetail;