import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  transactionAdd,
  transType,
  fetchTransaction,
  transactionUpdate,
  addTransactionThunk,
  updateTransactionThunk,
} from "./transactionSlice";
import { fetchCategories } from '../categories/categorySlice';
import { getDate,isValidDate,todayDate } from '../../helper/utility';
import { Transition } from 'react-transition-group';
import { async } from '@firebase/util';
import "./animation.css"
import { CSSTransition } from 'react-transition-group';



const AddTransaction = ({transactionType,accounts,setTransactionList,editId,setEditId,addTransaction,updateTransaction})=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allTransaction = useSelector(state=>state.transactions.entities)
    const transactions = useSelector(fetchTransaction)
    const categories = useSelector(fetchCategories)
    const loadingStatus = useSelector(state=>state.transactions.status)
    const [type,setType] = useState(transType.EXPENSE)
    
    const initialState = {type:type,date:todayDate(),amount:0,accountId:'cash',categoryId:'0',notes:"",desc:""}
    const [transaction,setTransaction] = useState(initialState)
    const transactionList  = transactions

    console.log("transactionList here: ",allTransaction)
    useEffect(()=>{
      
            if(editId!==null){
                console.log(transactionList)
                const currentTransaction = transactionList.find((item)=>item.id==editId)
                console.log(currentTransaction)
                setTransaction(currentTransaction)
                setType(currentTransaction.type)
            }else{
                
                setTransaction(initialState)
                setType(transType.EXPENSE)
                setEditId(null)
            }
        
            return async()=>{
                console.log("Component unmounted")
                await setTimeout(()=>{
                    console.log("will unmount in 1 sec")
                },1000)
            }
        

    },[editId])

    const handleChange = (e)=>{
        let name = e.target.name
        let value=  e.target.value
        if(name=="account"){
            name = "accountId"
          
        }

        if(name=='amount'){
            value = parseInt(value)
        }

        if(name=="category"){
            name = "categoryId"
        }
        if(name=="date"){
            console.log("invalid date si ",value)
            if(isValidDate(value)){
                value = new Date(value).toISOString().slice(0, 10)
            }else{
                value = new Date().toISOString().slice(0, 10)
            }
        }
        setTransaction({...transaction,[name]:value})
        console.log(transaction)
        
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // setTransaction({...transaction,id:Date.now()})
        console.log('added/updated transaction',transaction)
        if(editId!==null){
            dispatch(updateTransactionThunk(transaction))  
            navigate('/show')

            // updateTransaction({...transaction,type:type})  
        }else{
            dispatch(addTransactionThunk(transaction))
            // addTransaction({...transaction,id:Date.now(),type:type})
        }
        setTransaction(initialState)

    }
        

        
       

    const handleClick = (e,item)=>{
        
        e.preventDefault()
        if(type!=item){
            setType(item)
            setTransaction({...transaction,type:item})
        }

    }
    const loader = <div className='loader'><div className="lds-ripple"><div></div><div></div></div></div>
    return(

        <div className={(transType.INCOME==type)?"income":"expense"}>
            {loadingStatus=='loading'?loader:''}
            {editId!==null?(<h2>Edit Transaction</h2>):(<h2>Add Transaction</h2>)}
            <form onSubmit={handleSubmit}>
                <fieldset>
                <button className={(transType.INCOME==type)?"active":""} onClick={(e)=>handleClick(e,transType.INCOME)}>Income</button>
                <button className={(transType.EXPENSE==type)?"active":""} onClick={(e)=>handleClick(e,transType.EXPENSE)}>Expense</button>
                </fieldset>
            <label>
                    Date
            </label>
                
            <input type="date" name="date"  value={getDate(transaction.date)} onChange={handleChange}/>
            <label>Account : </label>
            <select name="account"  value={transaction.accountId} onChange={handleChange} >
                {accounts.map((item)=>( <option key={item.id} value={item.id}>{item.name}</option>))}
               
            </select>
            <label>Category : </label>
            <select name="category" value={transaction.categoryId}  onChange={handleChange}>
                <option value={0}>No select</option>
                {categories.map((item)=>{
                    if(item.type==transaction.type){
                    return (<option key={item.id} value={item.id}>{item.name}</option>)
                    }

                    
                    })}
               
            </select>
            <label>
            Amount
            </label>
            <input type="number" name="amount" value={transaction.amount} onChange={handleChange} />
                
            
            <label>Notes</label>
            <input type="text" name="notes"  value={transaction.notes} onChange={handleChange}/>
            <label>Description : </label>
            <textarea  name="desc" onChange={handleChange}  value={transaction.desc} placeholder='Enter here Something.'/>
            <button>SAVE</button>

            </form>
        </div>
    )
}



export default AddTransaction;