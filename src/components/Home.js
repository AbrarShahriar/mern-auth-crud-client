import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import Todo from './Todo';

axios.defaults.withCredentials = true

function Home() {

    const history = useHistory()

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    const [todo, setTodo] = useState({
        body: '',
        uid: ''
    })
    const [todos, setTodos] = useState([])

    // https://mern-deploy-test-adib.herokuapp.com/api/todos

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {console.log(res);
        })
        .catch(err => {console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('https://mern-deploy-test-adib.herokuapp.com/api/auth/isLoggedIn', { withCredentials: true })
        .then(res => {
            // console.log("HOME", res.data);
            if(res.data.isLoggedIn) {
                setIsLoggedIn(res.data.isLoggedIn)
                setUser(res.data.user)
                setTodo({
                    ...todo,
                    uid: res.data.user._id
                })

                fetchTodos(res.data.user._id)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const fetchTodos = async (uid) => {
        const res = await axios.get(`http://localhost:9000/api/todo/${uid}`)
        setTodos(res.data)
    }
    
    const logout = () => {
        console.log('logout');
        
        axios.delete(`https://mern-deploy-test-adib.herokuapp.com/api/auth/logout`, { withCredentials: true })
        .then(res => {
            // console.log(res);
            setIsLoggedIn(false)
            setUser(null)
        })
        .catch(err => {
          console.log(err);
        })
    }

    const addTodo = e => {
        e.preventDefault()

        axios.post('http://localhost:9000/api/todo/', todo)
        .then(res => {
            // console.log(res.data);
            fetchTodos(user._id)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleTodo = e => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }
 
    if(!isLoggedIn) {
       return <h1>NOT LOGGED IN</h1>
    }

    return (
        <div>
            Logged in 
            <br/>
            <p>{user?.username}</p>
            <p>{user?._id}</p>
            <br/>
            <button onClick={logout}>Logout</button>
            <br/>
            <br/>
            <hr/>

            <form action="">
                <h1>Add Todo</h1>
                <label htmlFor="body">Body: </label>
                <input onChange={handleTodo} type="text" name="body"/>
                <br/>
                <button type='submit' onClick={addTodo}>Add</button>
            </form>

            <hr/>

            <div>
                {todos.map(todo => <Todo fetchTodos={fetchTodos} key={todo._id} todoId={todo._id} finished={todo.finished} text={todo.body} uid={todo.uid} />)}
            </div>
        </div>
    )
}

export default Home
