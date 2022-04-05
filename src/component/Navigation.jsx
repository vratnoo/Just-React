import React from 'react'
import { Link } from "react-router-dom";

const Navigation = (props)=>{
    const {setIsEdit} = props
    const handleClick = (e)=>{
        // e.preventDafault()
        setIsEdit(false)
    }
    return(
        <nav>
            <ul>
                <li> <Link to="/" state={{updateMode:false}} onClick={handleClick}>Add</Link></li>
                <li> <Link to="/show" >Show</Link></li>
                <li> <Link to="/categories" >Categories</Link></li>
                
            </ul>
        </nav>
    )
}

export default Navigation