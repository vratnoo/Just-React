import React, { useEffect, useState } from 'react'



const AddTransaction = ({accounts,categories,transactionList,setTransactionList})=>{
    const initialState = {id:Date.now(),date:"12-12-12",amount:0,accountId:0,categoryId:0,notes:"",desc:""}
    const [transaction,setTransaction] = useState(initialState)

    useEffect(()=>{
        setTransaction(initialState)
    },[])

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
        setTransactionList([...transactionList,transaction])
       
        setTransaction(initialState)
    }

    return(
        <div>
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
            <label>
                    Date
            </label>
                
            <input type="date" name="date"  value={transaction.date} onChange={handleChange}/>
            <label>Account : </label>
            <select name="account"  value={transaction.accountId} onChange={handleChange} >
                {accounts.map((item)=>( <option key={item.id} value={item.id}>{item.name}</option>))}
               
            </select>
            <label>Category : </label>
            <select name="category" value={transaction.categoryId}  onChange={handleChange} >
                {categories.map((item)=>(  <option key={item.id} value={item.id}>{item.name}</option> ))}
               
            </select>
            <label>
            Amount
            </label>
            <input type="number" name="amount" onChange={handleChange} />
                
            
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