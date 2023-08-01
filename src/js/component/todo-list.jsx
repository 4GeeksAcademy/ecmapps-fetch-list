import React, { useEffect } from 'react';
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

    useEffect(()=>{
        getData();
        console.log("Running only once!")
    },[]);

    async function getData() {
        const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/ecmapps');
        const values = await response.json();
        console.log(values);
        setList(values);
    }
    async function createData() {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ecmapps', {
            method: 'POST',
            body: JSON.stringify([]),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(resp=> {
            console.log(resp.ok);
            console.log('status: '+resp.status);
            return resp.json();
        })
        .then((data) => {
            //Code starts here after fetch finishes
            console.log('successfully created the list');
        })
        .catch(error =>{
            console.log(error)
        });
    }

    async function setData() {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ecmapps', {
            method: 'PUT',
            body: JSON.stringify((listItems.length == 0)?{createData}:listItems),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(resp=> {
            console.log(resp.ok);
            console.log('status: '+resp.status);
            return resp.json();
        })
        .then((data) => {
            //Code starts here after fetch finishes
            //console.log('successfully changed the list');
        })
        .catch(error =>{
            console.log(error)
        });
    }

    function removeFromList(index) {
        let newArr = [...listItems];
        newArr.splice(index, 1);
        setList(newArr);
        setData();
    }

    return <div className='d-flex flex-column gap-2' style={containerStyle}>
        <h1 className='m-0'>To-Do List</h1>
        <input className="align-items-center form-control" type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} onKeyDown={handleEntry} />
        <ul className='list-group'>
            {((listItems == 0)?"No tasks, add a task.": listItems.map((item, index) =>
            <li className='list-group-item align-items-center d-flex justify-content-between text-break' key={index} onMouseEnter={() => setX(index)} onMouseLeave={() => setX(-1)}>
                <p className='m-0 text-break'>{item}</p>
                <button className='ms-2 btn' onClick={() => removeFromList(index)}><p className='m-0' style={((showX == index) ? { color: "black" } : { color: "white" })}>X</p></button>
            </li>)
        )}
        </ul>
        <small>Items Left: {listItems.length}</small>
    </div>
};

export default TodoList;

