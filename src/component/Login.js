import React, { useState } from 'react'
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from './loader'

const LoginPage = ({setToken}) => {
    const [credentail,setCredentail] = useState({username:"vratnoo",password:"123"})
    const [loadStatus,setLoadStatus] = useState('idle')
    const navigate = useNavigate()
    const handleChange  = (e)=>{
        const value  = e.target.value
        if(e.target.name=='username'){
                setCredentail({...credentail,username:value})
        }else{
            setCredentail({...credentail,password:value})
        }
                
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoadStatus('loading')
        const response = await axios.post('http://localhost:8080/users/login',{
            username:credentail.username,
            password:credentail.password
        })
        const token = response.data.token
        setToken({token})
        setLoadStatus('idle')

    }
  return (
    <div className='loginWrapper'>
        <Loader loadingStatus={loadStatus}/>
        <h1>Please Login</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" name="username" onChange={handleChange} />
            </label>

            <label>
                <p>Password</p>
                <input type="text" name="password" onChange={handleChange} />
            </label>
            <button type='submit'>Submit</button>
        </form>

    </div>
  )
}

export default LoginPage