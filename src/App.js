import React, { useEffect, useState } from 'react'
import  AddTransaction from "./AddTransaction"
import  ShowTransaction from "./ShowTransaction"
import Navigation from './component/Navigation'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [accounts,setAccounts] = useState([{id:0,name:"CASH"},{id:1,name:"ONLINE"}])
  const [categories,setCategories] = useState([{id:0,name:"Food"},{id:1,name:"Bills"},{id:2,name:"Transport"}])
  const [transactionList,setTransactionList] = useState([]);

  useEffect(()=>{
    console.log(transactionList)
  },[transactionList])
  
  const handleDelete = (id)=>{


    setTransactionList(transactionList.filter((item)=>item.id!==id))
    
  } 
  
  const props = {accounts,categories,transactionList,setTransactionList,handleDelete}
  return (
    <>

      <Navigation/>
      <div className='container'>
      <Routes>
        <Route path="/" element={ <AddTransaction  {...props} />} />
        <Route path="/show" element={ <ShowTransaction  {...props} />} />
    </Routes>
      </div>
      

     
      
    </>
  );
}

export default App;
