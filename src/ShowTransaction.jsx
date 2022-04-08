import React from 'react';

const getDay = (item)=>{
    const date = new Date(item)
    const day  = date.toLocaleDateString('en-us', {weekday: 'short' });
    const localDate  = date.toLocaleDateString('en-in');
    return localDate+" "+day
    
}

const ShowTransaction = ({transactionType,accounts,categories,transactionList,handleDelete,handleEdit})=>{

    let totalIncome = 0
    let totalExpense = 0
    transactionList.map((item)=>{
        if(item.type==transactionType.income){
            totalIncome+=parseInt(item.amount)
        }else{
            totalExpense+=parseInt(item.amount)
        }

    })

    transactionList.sort((item1,item2)=>{
        return new Date(item1.date) - new Date(item2.date)
    })
    const TranData = transactionList.reduce((total,item)=>{
        const date = new Date(item.date)
            if(total[date]==undefined){
                total[date] = []
            }
            total[date].push(item)
            return total
    },{})

    console.log(TranData)

    return(
        <div>
            <h2>View Transaction</h2>
            <div className='meter'>
                <div className="income">
                     <h1>{totalIncome}</h1>
                </div>
                <div className="expense">
                    <h1>{totalExpense}</h1>
                </div>
                <div className="net-income">
                    <h1>{totalIncome-totalExpense}</h1>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Type</th>
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
                        <>
                    {item.date}
                    <tr className={item.type==transactionType.income?"income":"expense"}>
                        <td>{item.id}</td>
                        <td>{item.type==transactionType.expense?"Expense":"Income"}</td>
                        <td>{accounts.map((account)=>(account.id===item.accountId)?account.name:"")}</td>
                        <td>{item.amount}</td>
                        <td>{categories.map((category)=>(category.id===item.categoryId)?category.name:"")}</td>
                        {console.log(typeof item.categoryId)}
                        {/* <td>{`${item.categoryId}+${categories}`}</td> */}
                        <td>{item.notes}</td>
                        <td>{item.desc}</td>
                        <td>{getDay(item.date)}</td>
                        <td><button key={item.id} name="edit" onClick={()=>handleEdit(item.id)}>Edit</button></td>
                        <td><button key={item.id} name="delete" onClick={()=>handleDelete(item.id)}>Delete</button></td>
                        
                    </tr></>))}
                    <tr>
                        <td colSpan={3}>Total</td>
                        <td>{transactionList.reduce((total,item)=>{
                            if(item.type===transactionType.income){
                                
                                return total+parseInt(item.amount)
                            }else{
                                
                                return total-parseInt(item.amount)
                            }
                            
                            },0)}</td>
                        <td colSpan={6}></td>
                    </tr>
                     
                    
                     
                    
                </tbody>
            </table>
        </div>
    )
}

export default ShowTransaction;