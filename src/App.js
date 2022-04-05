import React, { useEffect, useState } from 'react'
import  AddTransaction from "./AddTransaction"
import  ShowTransaction from "./ShowTransaction"
import Navigation from './component/Navigation'
import Category from "./categories"

import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
    const [accounts,setAccounts] = useState([{id:0,name:"CASH"},{id:1,name:"ONLINE"}])
    const [categories,setCategories] = useState([{id:0,name:"Food"},{id:1,name:"Bills"},{id:2,name:"Transport"}])
    const [transactionList,setTransactionList] = useState([]);
    const [isEdit,setIsEdit] = useState(false)
    const [editId,setEditId] = useState("")
    const navigate = useNavigate()

  useEffect(()=>{
    console.log("edit mode is: "+isEdit)

  },[isEdit])
  
  const handleDelete = (id)=>{
    setTransactionList(transactionList.filter((item)=>item.id!==id))
  }
  
  const handleEdit = (id)=>{
    setIsEdit(true)
    setEditId(id)
    // console.log("working : "+id)
    navigate("/",{state:{updateMode:false}})
  }
  const deleteCategory = (id)=>{
      setCategories(categories.filter((item)=>item.id!==id))
  }
  const editCategory = (id)=>{
    
  }

  const addCategory = (item)=>{
    setCategories({...categories,item})
  }

  const addTransaction = (transaction)=>{

    setTransactionList([...transactionList,transaction])

  }
  const updateTransaction = (transaction)=>{
    setTransactionList(transactionList.map((item)=>item.id==transaction.id?transaction:item))
    setIsEdit(false)
    navigate('/show')
  }

    

  
  const AddProps = {accounts,categories,transactionList,setIsEdit,addTransaction,updateTransaction,isEdit,editId,}
  const ShowProps = {accounts,categories,transactionList,setTransactionList,handleDelete,handleEdit}
  const CategoryProps = {categories,addCategory,deleteCategory,editCategory}
  return (
    <>

      <Navigation setIsEdit={setIsEdit}/>
      <div className='container'>
      <Routes>
        <Route path="/" element={ <AddTransaction  {...AddProps} />} />
        <Route path="/show" element={ <ShowTransaction  {...ShowProps} />} />
        <Route path="/categories" element={ <Category  {...CategoryProps} />} />
    </Routes>
      </div>
      

     
      
    </>
  );
}

export default App;
