import React, { useState } from 'react'



const AddTransaction = ()=>{
    const initialState = {id:null,amount:0,accountId:"",categoryId:"",notes:"",desc:""}
    const [accounts,setAccounts] = useState([{id:0,name:"CASH"},{id:1,name:"ONLINE"}])
    const [categories,setCategories] = useState([{id:0,name:"Food"},{id:1,name:"Bills"},{id:2,name:"Transport"}])
    const [tansaction,setTransaction] = useState(initialState);
    

    return(
        <div>
            <form>
            <label>
                    Date
            </label>
                
            <input type="date" name="date" />
            <label>Account : </label>
            <select name="account"  value={tansaction.accountId}>
                {accounts.map((account)=>( <option key={account.id} value={account.id}>{account.name}</option>))}
               
            </select>
            <label>Category : </label>
            <select name="account" >
                {categories.map((category)=>(  <option key={category.id} value={category.id}>{category.name}</option> ))}
               
            </select>
            <label>
            Amount
            </label>
            <input type="number" name="Amount" id="" />
                
            
            <label>Notes</label>
            <input type="text" name="notes"  />
            <label>Description : </label>
            <textarea  placeholder='Enter here Something.'/>
            <button>SAVE</button>

            </form>
        </div>
    )
}

export default AddTransaction;