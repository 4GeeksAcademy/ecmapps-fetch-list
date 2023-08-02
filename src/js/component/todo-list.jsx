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
    
    useEffect(()=>{
        getData();
    },[]);

    //Listen to the Enter key and add the item to the list.
    const handleEntry = (event) => {
        if (event.key === 'Enter') {
            if (inputValue === "") alert("The input cannot be empty");
            else {
                //Add to list
                let newArr = [...listItems, inputValue];
                setList(newArr);
                setData(newArr);
                //Clear input field
                setInputValue("");
            }
        }
    };

    async function getData() {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ecmapps').then(res =>{
            if(!res.ok) {
                //Add logic for 404 event and create user 
                if(res.status == 404){
                    //User does not exist
                    createUser();
                }
                else{throw Error(res.statusText);}
            }
            return res.json();
        }).then(data =>{
            console.log(data);
            //Data is fine and being added to the variable list
            setList(data);
        }).catch(error=> console.log(error))
    }
    async function setData(arr){
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ecmapps',{
            method: "PUT",
            body: JSON.stringify(arr),
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(resp => {
            if(!resp.ok){
                throw Error(resp.statusText);
            }
            console.log("List updated successfully!");
            return resp.json();
        }).then(data=>console.log({data}))
        .catch(error=>console.log(error))
    }

    async function createUser(){
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ecmapps',{
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            if(!res.ok){
                throw Error(res.statusText);
            }
            return res.json();
        })
        .then(data=>console.log("Success \n"+{data}))
        .catch(error=>console.log(error))
    }

    function removeFromList(index) {
        let newArr = [...listItems];
        newArr.splice(index, 1);
        setList(newArr);
        setData(newArr);
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

