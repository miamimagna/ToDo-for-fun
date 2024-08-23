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
                    <button className="todo-btn" onClick={editChange}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 13V17C21 19.7614 18.7614 22 16 22H8C5.23858 22 3 19.7614 3 17V9C3 6.23858 5.23858 4 8 4H12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                            <path d="M17.1721 3.28601C17.9525 2.50437 19.2184 2.50389 19.9994 3.28494L21.4887 4.77419C22.2631 5.54858 22.2711 6.80222 21.5067 7.58649L14.4467 14.8301C13.8823 15.4092 13.1082 15.7357 12.2998 15.7357L10.6026 15.7356C9.7498 15.7356 9.06872 15.0246 9.10459 14.1719L9.17869 12.4104C9.21028 11.6592 9.52251 10.9472 10.0536 10.4153L17.1721 3.28601Z" stroke="black" stroke-width="2"/>
                            <path d="M15.7298 4.86846L19.7438 8.88245" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button className="todo-btn" onClick={handleDelete}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2497_25966)">
                                <circle cx="12" cy="11.9999" r="9" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 10L10 14" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 10L14 14" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2497_25966">
                                <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </button>
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
