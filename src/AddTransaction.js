import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'



const AddTransaction = ({transactionType,accounts,categories,setIsEdit,transactionList,setTransactionList,editId,isEdit,addTransaction,updateTransaction})=>{
    
    let today = new Date().toISOString().slice(0, 10)
    const [type,setType] = useState(transactionType.expense)
    const initialState = {id:Date.now(),type:type,date:today,amount:0,accountId:0,categoryId:0,notes:"",desc:""}
    const [transaction,setTransaction] = useState(initialState)

    useEffect(()=>{
      
        
            if(isEdit && editId!==""){
                const currentTransaction = transactionList.filter((item)=>item.id==editId)
                // console.log(currentTransaction)
                setTransaction(currentTransaction[0])
                setType(currentTransaction[0].type)
            }else{
                
                setTransaction(initialState)
                setIsEdit(false)
            }
        
        

    },[isEdit,type])

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
        if(isEdit==true && editId!==""){
            updateTransaction({...transaction,type:type})    
        }else{
            
            addTransaction({...transaction,id:Date.now(),type:type})
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
        <div className={(transactionType.income==type)?"income":"expense"}>
            {isEdit?(<h2>Edit Transaction</h2>):(<h2>Add Transaction</h2>)}
            <form onSubmit={handleSubmit}>
                <fieldset>
                <button className={(transactionType.income==type)?"active":""} onClick={(e)=>handleClick(e,transactionType.income)}>Income</button>
                <button className={(transactionType.expense==type)?"active":""} onClick={(e)=>handleClick(e,transactionType.expense)}>Expense</button>
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