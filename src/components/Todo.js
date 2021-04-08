import axios from 'axios';
import React, { useState } from 'react'
import './Todo.css'

function Todo({ text, todoId, finished, fetchTodos, uid }) {

    const [done, setDone] = useState(finished)

    const handleFinished = e => {

        setDone(e.target.checked)
        // console.log(finished);
        
        
        axios.patch(`http://localhost:9000/api/todo/${todoId}`, { finished: e.target.checked })
        .then(res => {
            // console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:9000/api/todo/${todoId}`)
        .then(res => {
            // console.log("deleted", res.data)
            fetchTodos(uid)
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={done ? `todo --finished` : `todo`}>
            <input checked={done} onChange={handleFinished} type="checkbox" id="finished"/>
            <span>{text}</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Todo
