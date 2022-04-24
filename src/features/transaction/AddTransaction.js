import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  transactionAdd,
  transType,
  fetchTransaction,
  transactionUpdate,
} from "./transactionSlice";
import { fetchCategories } from '../categories/categorySlice';


const AddTransaction = ({transactionType,accounts,setTransactionList,editId,setEditId,addTransaction,updateTransaction})=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const transactions = useSelector(fetchTransaction)
    const categories = useSelector(fetchCategories)
    const [type,setType] = useState(transType.EXPENSE)
    let today = new Date().toISOString().slice(0, 10)
    const initialState = {id:Date.now(),type:type,date:today,amount:0,accountId:0,categoryId:0,notes:"",desc:""}
    const [transaction,setTransaction] = useState(initialState)
    const transactionList  = transactions


    useEffect(()=>{
      
        
            if(editId!==null){
                const currentTransaction = transactionList.find((item)=>item.id==editId)
                // console.log(currentTransaction)
                setTransaction(currentTransaction)
                setType(currentTransaction.type)
            }else{
                
                setTransaction(initialState)
                setType(transType.EXPENSE)
                setEditId(null)
            }
        
        

    },[editId])

    const handleChange = (e)=>{
        let name = e.target.name
        let value=  e.target.value
        if(name=="account"){
            name = "accountId"
            value = parseInt(value)
        }

        if(name=="category"){
            name = "categoryId"
            value = parseInt(value)
        }
        console.log(transaction)
        setTransaction({...transaction,[name]:value})
        
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // setTransaction({...transaction,id:Date.now()})
        if(editId!==null){
            dispatch(transactionUpdate(transaction))  
            navigate('/show')

            // updateTransaction({...transaction,type:type})  
        }else{
            dispatch(transactionAdd(transaction))
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

    return(
        <div className={(transType.INCOME==type)?"income":"expense"}>
            {editId!==null?(<h2>Edit Transaction</h2>):(<h2>Add Transaction</h2>)}
            <form onSubmit={handleSubmit}>
                <fieldset>
                <button className={(transType.INCOME==type)?"active":""} onClick={(e)=>handleClick(e,transType.INCOME)}>Income</button>
                <button className={(transType.EXPENSE==type)?"active":""} onClick={(e)=>handleClick(e,transType.EXPENSE)}>Expense</button>
                </fieldset>
            <label>
                    Date
            </label>
                
            <input type="date" name="date"  value={transaction.date} onChange={handleChange}/>
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