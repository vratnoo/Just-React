import React, { useEffect, useState } from 'react'
import  AddTransaction from "./features/transaction/AddTransaction"
import  ShowTransaction from "./features/transaction/ShowTransaction"
import  TransactionChart from "./features/stats/Stats"
import Navigation from './component/Navigation'
import Category from "./categories"

import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
    const accounts = [{id:0,name:"CASH"},{id:1,name:"ONLINE"}]
    const [editId,setEditId] = useState(null)
    const navigate = useNavigate()
 

  useEffect(()=>{
    console.log("edit mode is: "+editId)

  },[editId])
  
  
  const handleEdit = (id)=>{
    setEditId(id)
    navigate("/",{state:{updateMode:false}})
  }
   


    

  
  const AddProps = {setEditId,accounts,editId}
  const ShowProps = {setEditId,accounts,handleEdit}
  return (
    <>

      <Navigation setEditId={setEditId}/>
      <div className='container'>
      <Routes>
        <Route path="/" element={ <AddTransaction  {...AddProps} />} />
        <Route path="/show" element={ <ShowTransaction  {...ShowProps} />} />
        <Route path="/categories" element={ <Category />} />
        <Route path="/stats" element={ <TransactionChart/>} />
    </Routes>
      </div>
      

     
      
    </>
  );
}

export default App;
