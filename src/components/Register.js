import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


function Register() {
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

    const createUser = e => {
      e.preventDefault()
      axios.post('https://mern-deploy-test-adib.herokuapp.com/api/auth/signup', cred)
      .then(res => {
        console.log(res.data);
        history.push('/')
      })
      .catch(err => {
        console.log(err);
      }) 
    }

    return (
      <form action="">

        <h1>Register</h1>

        <label htmlFor="username">username: </label>
        <input onChange={handleCred} type="text" name="username" value={cred.username}/>

        <br/>

        <label htmlFor="password">password: </label>
        <input onChange={handleCred} type="text" name="password" value={cred.password}/>

        <br/>

        <button onClick={createUser}>Create</button>

      </form>
    )
}

export default Register
