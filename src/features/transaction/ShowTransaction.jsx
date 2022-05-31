import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../categories/categorySlice';
import {fetchTransaction, fetchTransactionThunk} from './transactionSlice'
import { transType, deleteTransactionThunk } from './transactionSlice';
    import { fetchFilterMonth, fetchSearchFilter } from '../filter/filterSlice';
import { getDay,isValidDate } from '../../helper/utility';
import Filters from '../filter/filterSection';
const ShowTransaction = ({accounts,handleEdit})=>{
    const transactions = useSelector(fetchTransaction)
    const categories = useSelector(fetchCategories)
    const filterMonth = useSelector(fetchFilterMonth)
    const searchFilter = useSelector(fetchSearchFilter)
    const loadingStatus = useSelector(state=>state.transactions.status)
    console.log("check data",transactions)
    const filterdTransaction = transactions.filter((item)=>{
        const date = new Date(item.date)
        console.log("item date === filter date",item.date,filterMonth)
        const searchResult = item.notes.search(searchFilter)
        console.log(item.notes,searchFilter,searchResult)
        return (date.getMonth() === filterMonth.getMonth()) && (searchResult !== -1)
    })
    const dispatch = useDispatch()

    let totalIncome = 0
    let totalExpense = 0
    filterdTransaction.map((item)=>{
        if(item.type==transType.INCOME){
            totalIncome+=parseInt(item.amount)
        }else{
            totalExpense+=parseInt(item.amount)
        }

    })

    const handleDelete = (id)=>{
        // dispatch(transactionDelete(id))
        dispatch(deleteTransactionThunk(id))
    }
    const TranData = filterdTransaction.reduce((total,item)=>{
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

    console.log("Trans data",TranData)

    const keys = Object.keys(TranData).sort((item1,item2)=>{
        return new Date(item2) - new Date(item1)
    })

    console.log("loading status",loadingStatus)

    useEffect(()=>{
        // dispatch(fetchTransactionThunk())
    },[])
    const loader = <div className='loader'><div class="lds-ripple"><div></div><div></div></div></div>
    return(
        <div>
            {(loadingStatus==='loading')?loader:null}
            <Filters/>
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