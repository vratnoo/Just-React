import React, { useEffect, useState } from 'react'
import  AddTransaction from "./features/transaction/AddTransaction"
import  ShowTransaction from "./features/transaction/ShowTransaction"
import  TransactionChart from "./Stats"
import Navigation from './component/Navigation'
import Category from "./categories"

import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
    const transactionType = {income:1,expense:2}
    const [accounts,setAccounts] = useState([{id:0,name:"CASH"},{id:1,name:"ONLINE"}])
    const [categories,setCategories] = useState([
                      {id:1,name:"Food",type:transactionType.expense},
                      {id:2,name:"Bills",type:transactionType.expense},
                      {id:3,name:"Transport",type:transactionType.expense},
                      {id:4,name:"Salary",type:transactionType.income}
                    
                    ])
    const [transactionList,setTransactionList] = useState([]);
    const [isEdit,setIsEdit] = useState(false)
    const [editId,setEditId] = useState(null)
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
 

  const addCategory = (item)=>{
    setCategories([...categories,item])
  }
  const updateCategory = (category)=>{
    setCategories(categories.map((item)=>item.id==category.id?category:item))
  }
  const addTransaction = (transaction)=>{

    setTransactionList([...transactionList,transaction])

  }
  const updateTransaction = (transaction)=>{
    setTransactionList(transactionList.map((item)=>item.id===transaction.id?transaction:item))
    setIsEdit(false)
    navigate('/show')
  }

    

  
  const AddProps = {setEditId,transactionType,accounts,categories,transactionList,setIsEdit,addTransaction,updateTransaction,isEdit,editId,}
  const ShowProps = {setEditId,transactionType,accounts,categories,transactionList,setTransactionList,handleDelete,handleEdit}
  const CategoryProps = {categories,addCategory,deleteCategory,updateCategory,transactionType}
  const ChartProps = {transactionList,categories,transactionType}
  return (
    <>

      <Navigation setIsEdit={setIsEdit}/>
      <div className='container'>
      <Routes>
        <Route path="/" element={ <AddTransaction  {...AddProps} />} />
        <Route path="/show" element={ <ShowTransaction  {...ShowProps} />} />
        <Route path="/categories" element={ <Category  {...CategoryProps} />} />
        <Route path="/stats" element={ <TransactionChart {...ChartProps}/>} />
    </Routes>
      </div>
      

     
      
    </>
  );
}

export default App;
