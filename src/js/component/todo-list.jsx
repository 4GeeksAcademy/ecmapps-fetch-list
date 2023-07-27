import React from 'react';
import { useState, useEffect } from 'react';

const containerStyle = {
    margin: "10px"
};

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [listItems, setList] = useState([]);
    const [listIndex, setListIndex] = useState(0);
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
        newArr.splice(index,1);
        setList(newArr);
    }

    return <div className='container-fluid d-block justify-content-center' style={containerStyle}>
        <h1>To-Do List</h1>
        <input type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} onKeyDown={handleEntry} />
        <ul className='list-group'>
            {listItems.map((item, index) => 
            <li className='list-group item d-inline my-1' key={index}>
                {item}
                <button className='ms-2' onClick={()=> removeFromList(index)}>x</button>
            </li>)}
        </ul>
        <p>Items Left: {listItems.length}</p>
    </div>
};

export default TodoList;