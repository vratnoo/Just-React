import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../categories/categorySlice';
import {fetchTransaction} from './transactionSlice'
import { transType, trabsactionDelete } from './transactionSlice';
const getDay = (item)=>{
    const date = new Date(item)
    const day  = date.toLocaleDateString('en-us', {weekday: 'short' });
    const localDate  = date.toLocaleDateString('en-in');
    return localDate+" "+day
    
}

const ShowTransaction = ({accounts,handleEdit})=>{
    const transactions = useSelector(fetchTransaction)
    const categories = useSelector(fetchCategories)
    const dispatch = useDispatch()

    let totalIncome = 0
    let totalExpense = 0
    transactions.map((item)=>{
        if(item.type==transType.INCOME){
            totalIncome+=parseInt(item.amount)
        }else{
            totalExpense+=parseInt(item.amount)
        }

    })

    const handleDelete = (id)=>{
        dispatch(trabsactionDelete(id))
    }
    const TranData = transactions.reduce((total,item)=>{
        const date = item.date
        const income = 0;
        const expense = 0;
            if(total[date]==undefined){
                total[date] = {Data:[],income:0,expense:0}
            }
            total[date].Data.push(item)
            if(item.type==transType.INCOME){
                total[date].income+=parseInt(item.amount)
            }else{
                total[date].expense+=parseInt(item.amount)
            }
            return total
    },{})

    const keys = Object.keys(TranData).sort((item1,item2)=>{
        return new Date(item2) - new Date(item1)
    })

    console.log(keys)

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
                   {keys.map((transaction_item)=>{
                       let groupIncome = 0;
                       let groupExpense = 0;
                       return(
                           <>
                           <tr className='Trans_group'>
                               <td colSpan={4} className="date">{getDay(transaction_item)}</td>
                               <td colSpan={2} className='income'>{TranData[transaction_item].income}</td>
                               <td colSpan={2} className='expense'>{TranData[transaction_item].expense}</td>
                               <td colSpan={2} className='net-income'>{TranData[transaction_item].income-TranData[transaction_item].expense}</td>
                               
                          </tr>

                            {TranData[transaction_item].Data.map((item)=>(
                                <tr className={item.type==transType.INCOME?"income":"expense"}>
                                <td>{item.id}</td>
                                <td>{item.type==transType.EXPENSE?"Expense":"Income"}</td>
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
                                
                                </tr>
                            ))}
                        </>
                       )

                   })}
                    <tr>
                        <td colSpan={3}>Total</td>
                        <td>{totalIncome-totalExpense}</td>
                        <td colSpan={6}></td>
                    </tr>
                     
                    
                     
                    
                </tbody>
            </table>
        </div>
    )
}

export default ShowTransaction;