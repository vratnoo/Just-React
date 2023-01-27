import React, { useEffect, useState } from 'react'
import  {fetchTransactionThunk} from "./features/transaction/transactionSlice"
import {fetchCategoriesThunk} from "./features/categories/categorySlice"
import  AddTransaction from "./features/transaction/AddTransaction"
import  ShowTransaction from "./features/transaction/ShowTransaction"
import  TransactionChart from "./features/stats/Stats"
import Navigation from './component/Navigation'
import Category from "./categories"
import FilterSection from './features/filter/filterSection'
import Test from './features/test/Test'
import { useDispatch } from 'react-redux'
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
    const accounts = [{id:'cash',name:"CASH"},{id:'online',name:"ONLINE"}]
    const [editId,setEditId] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
 

  useEffect(()=>{
    console.log("edit mode is: "+editId)
    if(editId===null){
      dispatch(fetchTransactionThunk())
      dispatch(fetchCategoriesThunk())
    }


  },[])
  
  
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
        <Route path="/test" element={ <Test/>} />
        <Route path="/show" element={ <ShowTransaction  {...ShowProps} />} />
        <Route path="/categories" element={ <Category />} />
        <Route path="/stats" element={ <TransactionChart/>} />
    </Routes>
      </div>
      

     
      
    </>
  );
}

export default App;
