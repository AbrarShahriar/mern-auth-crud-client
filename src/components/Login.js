import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'

//to set cookies
axios.defaults.withCredentials = true

function Login() {
    const history = useHistory()

    const [cred, setCred] = useState({
      username: '',
      password: ''
    })

    const handleCred = (e) => {
      setCred({
        ...cred,
        [e.target.name]: e.target.value
      })
    }

    const loginUser = e => {
      e.preventDefault()
      axios.post('https://mern-deploy-test-adib.herokuapp.com/api/auth/login', cred)
        .then(res => {
          console.log(res);
          history.push('/')
        })
        .catch(err => {
          console.log(err);
        })
    }

    return (
        <form action="">

        <h1>Login</h1>

        <label htmlFor="username">username: </label>
        <input onChange={handleCred} type="text" name="username" value={cred.username}/>

        <br/>

        <label htmlFor="password">password: </label>
        <input onChange={handleCred} type="text" name="password" value={cred.password}/>

        <br/>

        <button onClick={loginUser}>Login</button>
      </form>
    )
}

export default Login
