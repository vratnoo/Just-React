import React, { useEffect, useState } from 'react'
import  {fetchTransactionThunk} from "./features/transaction/transactionSlice"
import {fetchCategoriesThunk} from "./features/categories/categorySlice"
import  AddTransaction from "./features/transaction/AddTransaction"
import  ShowTransaction from "./features/transaction/ShowTransaction"
import  TransactionChart from "./features/stats/Stats"
import Navigation from './component/Navigation'
import Category from "./categories"
import { useDispatch } from 'react-redux'
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginPage from './component/Login'
import useToken from './component/useToken'


function App() {
    const accounts = [{id:'cash',name:"CASH"},{id:'online',name:"ONLINE"}]
    const [editId,setEditId] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token,setToken} = useToken()
    const [showAddTransaction,setShowAddTransaction] = useState(false)

  useEffect(()=>{
    console.log("token is here",token)
    if(editId===null){
      dispatch(fetchTransactionThunk())
      dispatch(fetchCategoriesThunk())
    }


  },[])
  
  
  const handleEdit = (id)=>{
    setEditId(id)
    navigate("/")
  }
   


    

  
  const AddProps = {setEditId,accounts,editId,showAddTransaction,setShowAddTransaction}
  const ShowProps = {setEditId,accounts,handleEdit}

  if(!token || token===null){
    return <LoginPage setToken={setToken}/>
  }
  return (
    <>
      <div className='main'>
      <Navigation setToken={setToken} token={token} setEditId={setEditId}/>
      <div className='container'>
      <Routes>
        <Route path="/" element={ <AddTransaction  {...AddProps} />} />
        <Route path="/show" element={ <ShowTransaction  {...ShowProps} />} />
        <Route path="/categories" element={ <Category />} />
        <Route path="/stats" element={ <TransactionChart/>} />
    </Routes>
      </div>
      </div>
      

     
      
    </>
  );
}

export default App;
