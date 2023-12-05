import React from 'react';
import './Tags.scss';



const Tags = ({ tags, onRemoveTag }) => {
    return (
        <div className='tags'>
            {tags.map(tag => (
                <span key={tag}>
                    {tag} <button onClick={() => onRemoveTag(tag)} className="closeTag">&times;</button>
                </span>
            ))}
        </div>
    );
};

export default Tags;