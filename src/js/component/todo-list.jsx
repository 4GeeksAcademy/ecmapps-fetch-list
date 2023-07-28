import React from 'react';
import { useState } from 'react';

const containerStyle = {
    margin: "10px",
    width: "350px"
};

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [listItems, setList] = useState([]);
    const [showX, setX] = useState(-1);
    const handleEntry = (event) => {
        if (event.key === 'Enter') {
            if (inputValue === "") alert("The input cannot be empty");
            else {
                //Add to list
                let newArr = [...listItems, inputValue];
                setList(newArr);
                //Clear input field
                setInputValue("");
            }
        }
    };

    function removeFromList(index) {
        let newArr = [...listItems];
        newArr.splice(index, 1);
        setList(newArr);
    }

    return <div className='d-flex flex-column' style={containerStyle}>
        <h1>To-Do List</h1>
        <input className="align-items-center form-control" type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} onKeyDown={handleEntry} />
        <ul className='list-group mt-2'>
        {listItems.map((item, index) =>
            <li className='list-group-item align-items-center d-flex justify-content-between' key={index} onMouseEnter={() => setX(index)} onMouseLeave={() => setX(-1)}>
                <p className='m-0'>{item}</p>
                <button className='ms-2 btn' onClick={() => removeFromList(index)}><p className='m-0' style={((showX == index) ? { color: "black" } : { color: "white" })}>X</p></button>
            </li>)
        }
        </ul>
        <small>Items Left: {listItems.length}</small>
    </div>
};

export default TodoList;

