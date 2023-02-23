import React, { useEffect, useState } from 'react'
import  {fetchTransactionThunk} from "./features/transaction/transactionSlice"
import {fetchCategoriesThunk} from "./features/categories/categorySlice"
import  AddTransaction from "./features/transaction/AddTransaction"
import  ShowTransaction from "./features/transaction/ShowTransaction"
import  TransactionChart from "./features/stats/Stats"
import Navigation from './component/Navigation'
import Category from "./features/categories/categories"
import FilterSection from './features/filter/filterSection'
import Test from './features/test/Test'
import { useDispatch } from 'react-redux'
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from './layout/Header'
import Aside from './layout/Aside'

function App() {
    
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
   


    

  
  const AddProps = {setEditId,editId}
  const ShowProps = {setEditId,handleEdit}
  return (
    <>
      <Header>
        
        <Navigation setEditId={setEditId}/>
      </Header>
      <div className='flex container mx-auto'>
        <Aside/>
        <main className='w-full px-5'>
          <div className='container'>
      <Routes>
        <Route path="/" element={ <AddTransaction  {...AddProps} />} />
        <Route path="/test" element={ <Test/>} />
        <Route path="/show" element={ <ShowTransaction  {...ShowProps} />} />
        <Route path="/categories" element={ <Category />} />
        <Route path="/stats" element={ <TransactionChart/>} />
    </Routes>
      </div>
        </main>
        

      </div>      

      
      

     
      
    </>
  );
}

export default App;
