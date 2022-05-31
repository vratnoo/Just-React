import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import useToken from './useToken';

const Navigation = (props)=>{
    const {setEditId,token,setToken} = props
    const navigate = useNavigate()
    const handleClick = (e)=>{
        setEditId(null)
    }
    const handleLogout = async(e)=>{
        e.preventDefault()
        const response = await axios.post('http://localhost:8080/users/logout',{
            sessionId:token
        })
        const status = response.data.status
        if(status==='loggedOut'){
            setToken({token:null})
        }

        // navigate("/")
    }
    return(
        <nav className='sidebar'>
            <ul>
                <li> <Link to="/" state={{updateMode:false}} onClick={handleClick}>Add New</Link></li>
                <li> <Link to="/show" >Transactions</Link></li>
                <li> <Link to="/categories" >Categories</Link></li>
                <li> <Link to="/stats" >Stats</Link></li>
                <li> <a href="" onClick={handleLogout}>logout</a></li>
                
            </ul>
        </nav>
    )
}

export default Navigation