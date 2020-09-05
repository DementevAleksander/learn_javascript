import React from 'react';
import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({posts, onDeleted}) => {

    const elements = posts.map((item) => {
        return (
            <li key={item.id} className='list-group-item'>
                <PostListItem
                    label={item.label}
                    important={item.important}
                    onDeleted={() => onDeleted(item.id)} />
            </li>
        )
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;