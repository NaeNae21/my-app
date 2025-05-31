import React from "react";


const Comment = ({ author, body, ups, isExpanded, onToggle }) => {
    const shortText = body.length > 100? body.slice(0, 100) + '...' : body;
    const commentText = isExpanded ? body : shortText;


   return (
        <div className='comment-card'>
            <div className='comment-header'>
                <p><strong>{author}</strong></p>
                <p>👍 {ups}</p>
            </div>
            <p>
                {commentText}
                {body.length > 100 && (
                <button onClick={onToggle} className='toggle-button'>{isExpanded ? 'Show less' : 'Show more'}</button>
                )}
            </p>
        </div>
    );
}

export default Comment;