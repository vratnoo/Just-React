import React, { useEffect, useState } from 'react'
import  AddTransaction from "./AddTransaction"
import EditTransaction from "./EditTransaction"
import  ShowTransaction from "./ShowTransaction"
import Navigation from './component/Navigation'

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  const [accounts,setAccounts] = useState([{id:0,name:"CASH"},{id:1,name:"ONLINE"}])
  const [categories,setCategories] = useState([{id:0,name:"Food"},{id:1,name:"Bills"},{id:2,name:"Transport"}])
  const [transactionList,setTransactionList] = useState([]);
  const [editing,setEditing] = useState(false)
  const [editId,setEditId] = useState("")
  let navigate = useNavigate();
  useEffect(()=>{
    console.log(transactionList)
    console.log(editId)
  },[transactionList,editId])
  
  const handleDelete = (id)=>{


    setTransactionList(transactionList.filter((item)=>item.id!==id))
    
  } 
  
  const handleEdit = (id)=>{
    alert(id)
    setEditing(true)
    setEditId(id)
    navigate("/edit",{state:{editId:id}})
  }
    
 
  const props = {accounts,categories,transactionList,setTransactionList,handleDelete,handleEdit,editing,editing}
  return (
    <>

      <Navigation/>
      <div className='container'>
      <Routes>
        <Route path='/' element={<AddTransaction {...props} />} />
        <Route path='/edit' element={<EditTransaction {...props} />} />
           
        <Route path="/show" element={ <ShowTransaction  {...props} />} />
    </Routes>
      </div>
      

     
      
    </>
  );
}

export default App;
