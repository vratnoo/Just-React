import React from 'react'
import { Link } from "react-router-dom";

const Navigation = (props)=>{
    const {setEditId} = props
    const handleClick = (e)=>{
        setEditId(null)
    }
    return(
        <nav>
            <ul>
                <li> <Link to="/" state={{updateMode:false}} onClick={handleClick}>Add</Link></li>
                <li> <Link to="/show" >Show</Link></li>
                <li> <Link to="/categories" >Categories</Link></li>
                <li> <Link to="/stats" >Stats</Link></li>
                
            </ul>
        </nav>
    )
}

export default Navigation