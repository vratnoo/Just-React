import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const EditTransaction = ({editing,editId})=>{
    const EditId = useLocation();
    if(editing){
        return(<h1>This is working.{EditId.state.editId}</h1>)
    }else{
        return(<h1>This is working but partialiy</h1>)
    }
    
}

export default EditTransaction
