import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../features/comments/Comment';
import { fetchComments } from '../features/comments/commentsSlice';

const PostDetail = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const commentState = useSelector((state) => state.comments.commentsByPostId[postId]) || {};
    const { comments = [], status: commentStatus, error } = commentState;

    const [expandedComments, setExpandedComments] = useState([]);

    const post = useSelector((state) => state.posts.posts.find((post) => post.id === postId)
    );

    const permalink = post.permalink;

    useEffect(() => {
        const hasComments = comments && comments.length > 0;

        if (!hasComments && commentStatus !== 'failed') {
            dispatch(fetchComments({ postId, permalink }));
        }
    }, [commentStatus, dispatch, postId, permalink]);


    const toggleExpand = (commentId) => {
        setExpandedComments((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    }

    if (!post) {
        return <p className='failed'>Post not found.</p>
    }

    return (
        <div>
            <div className='post-card'>
                <div className='go-back-container'><Link className='go-back' to="/">Go Back ↩</Link></div>
                <h2 className='post-title'>{post.title}</h2>
                <div className='post-header'>
                    <p>by {post.author}</p>
                    <p>⬆ {post.ups}</p>
                </div>
                <hr/>
                <div className='post-detail-content'>
                    {post.selftext && <p>{post.selftext}</p>}
                        {post.image && <img className="post-detail-image" src={post.image}></img>}
                        {post.gallery && (
                            <div className="gallery">
                                {post.gallery_images.map((imgUrl, i) => (
                                    <img className="post-detail-image" 
                                    key={i} 
                                    src={imgUrl}></img>
                                ))}
                            </div>  
                        )}
                    <a className='go-back' target="_blank" href={post.url}>See the full Reddit post</a>    
                </div>
            </div>

            <h3 className='comments-header'>Comments</h3>
            {commentStatus === 'loading' && <div>
                <div className='loading-comment'>
                    <div className='loading-comment-header'>
                        <div className='loading-comment-author shimmer'></div>
                        <div className='loading-comment-ups shimmer'></div>
                    </div>
                    <div className='loading-comment-content shimmer'></div>
                </div>
            </div>}
            {commentStatus === 'failed' && <div className='failed'>
                <p>Failed to Load Comments.</p>
                <button className="retry-button" onClick={() => dispatch(fetchComments({ postId, permalink }))}>Retry ↺</button>
            </div>}
            {commentStatus === 'succeeded' && comments.length === 0 && <p className='failed'>No comments yet.</p>}
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