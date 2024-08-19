import React, { useEffect, useState } from 'react';


function calcDiff(createdAt) {
    const now = new Date();
    createdAt = new Date(createdAt);

    const diffMs = now - createdAt;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    let timeAgo;
    if (diffDays > 0) {
        timeAgo = `${diffDays} days ago`;
    } else if (diffHours > 0) {
        timeAgo = `${diffHours} hours ago`;
    } else if (diffMinutes > 0) {
        timeAgo = `${diffMinutes} minutes ago`;
    } else {
        timeAgo = `${diffSeconds} seconds ago`;
    }
    return timeAgo;
}

const TodoCard = ({ itemOrig, handleDelete, handleChanges }) => {
    var item = itemOrig? JSON.parse(JSON.stringify(itemOrig)): {};
    const { title, desc, createdAt } = item;
    const [timeDif, setTimeDif] = useState(() => calcDiff(createdAt));
    const [editable, setEditable] = useState(false);    
    const [formItem, setFormItem] = useState(item);

    function handleChange(e){
        setFormItem({
            ...formItem,
            [e.target.name]: e.target.value
        })
    }
    function editChange(){
        if(editable){
            handleChanges(formItem);
        }
        setEditable(!editable);
    }
    function handleKey(e){
        if(e.key === 'Enter')
            editChange();
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDif(calcDiff(createdAt));
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [createdAt]);

    return (
        <>
        <div key={item._id} className='todo-item'>
            <div className="header">
                <div className="todo-details">
                    {!editable? 
                        <p className="title">{title}</p>
                        : <input 
                            className='title-input' 
                            type="text" 
                            name='title' 
                            value={formItem.title} 
                            onChange={handleChange}
                            onKeyDown={handleKey}
                          />
                    }
                    <p className='create-time'>{timeDif}</p>
                </div>
                <div className="todo-buttons">
                    <button className="todo-btn" onClick={editChange}>Edit</button>
                    <button className="todo-btn delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className="desc">
                {!editable?
                    <p>{desc}</p>
                    : <input 
                        className='desc-input'
                        type='text'
                        name='desc'
                        value={formItem.desc}
                        onChange={handleChange}
                        onKeyDown={handleKey}
                        placeholder='description'
                    />
                }
            </div>
        </div>
        </>
    );
}

export default TodoCard;
