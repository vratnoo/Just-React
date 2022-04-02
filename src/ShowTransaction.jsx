import React from 'react';


const ShowTransaction = ({accounts,categories,transactionList,handleDelete})=>{

    
    return(
        <div>
            <h2>Add Transaction</h2>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Notes</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionList.map((item)=>(
                    <tr>
                        <td>{item.id}</td>
                        <td>{accounts.map((account)=>(account.id===item.accountId)?account.name:"")}</td>
                        <td>{item.amount}</td>
                        <td>{categories.map((category)=>(category.id===item.categoryId)?category.name:"")}</td>
                        {console.log(typeof item.categoryId)}
                        {/* <td>{`${item.categoryId}+${categories}`}</td> */}
                        <td>{item.notes}</td>
                        <td>{item.desc}</td>
                        <td>{item.date}</td>
                        <td><button key={item.id} name="edit" id={item.id}>Edit</button></td>
                        <td><button key={item.id} name="delete" onClick={()=>handleDelete(item.id)}>Delete</button></td>
                        
                    </tr>))}
                    
                     
                    
                </tbody>
            </table>
        </div>
    )
}

export default ShowTransaction;