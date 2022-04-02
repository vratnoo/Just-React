import React from 'react'
import { Link } from "react-router-dom";

const Navigation = ()=>{

    return(
        <nav>
            <ul>
                <li> <Link to="/">Add</Link></li>
                <li> <Link to="/show">Show</Link></li>
                
            </ul>
        </nav>
    )
}

export default Navigation