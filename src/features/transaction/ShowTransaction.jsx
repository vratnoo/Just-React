import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../categories/categorySlice';
import {fetchTransaction, fetchTransactionThunk} from './transactionSlice'
import { transType, deleteTransactionThunk } from './transactionSlice';
import FilterSection from '../filter/filterSection';
import { fetchFilterMonth } from '../filter/filterSlice';
import { getDay,isValidDate } from '../../helper/utility';
const ShowTransaction = ({accounts,handleEdit})=>{
    const transactions = useSelector(fetchTransaction)
    const categories = useSelector(fetchCategories)
    const filterMonth = useSelector(fetchFilterMonth)
    const loadingStatus = useSelector(state=>state.transactions.status)
    console.log("check data",transactions)
    const filterdTransaction = transactions.filter((item)=>{
        const date = new Date(item.date)
        console.log("item date === filter date",item.date,filterMonth)
        return date.getMonth() === filterMonth.getMonth()
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
        <div className='p-4 flex flex-col'>
            {(loadingStatus==='loading')?loader:null}
            <div className="flex justify-between items-center">
            <h2 className='text-gray-500 text-2xl font-bold'>Transactions</h2>
            <FilterSection/>
            </div>

            <div className='flex items-center justify-between w-full max-w-2xl mx-auto py-6 text-2xl font-extrabold'>
                <div className="text-green-700 flex flex-col items-center">
                     <p className='text-sm text-slate-400'>INCOME</p>
                     <h1>{totalIncome}</h1>
                </div>
                <div className="text-red-700  flex flex-col items-center">
                    <p className='text-sm text-slate-400'>EXPANSE</p>
                    <h1>{totalExpense}</h1>
                </div>
                <div className="text-indigo-800 flex flex-col items-center">
                    <p className='text-sm text-slate-400'>NET</p>
                    <h1>{totalIncome-totalExpense}</h1>
                </div>
            </div>
            <table>
                <thead className='text-sm uppercase text-gray-700 bg-gray-50'>
                    <tr>
                        <th  className='py-2 px-3'>id</th>
                        <th className='py-2 px-3'>Type</th>
                        <th className='py-2 px-3'>Account</th>
                        <th className='py-2 px-3'>Amount</th>
                        <th className='py-2 px-3'>Category</th>
                        <th className='py-2 px-3'>Notes</th>
                        <th className='py-2 px-3'>Description</th>
                        <th className='py-2 px-3'>Date</th>
                        <th className='py-2 px-3'>Edit</th>
                        <th className='py-2 px-3'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   {keys.map((transaction_item)=>{
                       let groupIncome = 0;
                       let groupExpense = 0;
                       return(
                           <>
                           <tr className='bg-white  text-lg text-center border-t-2 border-t-gray-300 rounded-md text-gray-900 font-semibold '>
                               <td colSpan={4} className="py-3">{getDay(transaction_item)}</td>
                               <td colSpan={2} className='text-green-700 py-3'>{TranData[transaction_item].income}</td>
                               <td colSpan={2} className='text-red-700 py-3' >{TranData[transaction_item].expense}</td>
                               <td colSpan={2} className='text-sky-700 py-3'>{TranData[transaction_item].income-TranData[transaction_item].expense}</td>
                               
                          </tr>

                            {TranData[transaction_item].Data.map((item)=>(
                                <tr className={"bg-gray-50"}>
                                <td className='px-6 py-3'>{item.id}</td>
                                <td className='px-6 py-3'>{item.type==transType.EXPENSE?(
                                    <span className='px-3 mr-2 bg-red-200 flex items-center justify-center text-red-700 rounded-md font-bold'>Expanse</span>
                                ):(
                                    <span className='px-3 mr-2 bg-green-200  flex items-center justify-center text-green-700 rounded-md font-bold'>Income</span>                                    
                                )}</td>
                                <td className='px-6 py-3'>{accounts.map((account)=>(account.id===item.accountId)?account.name:"")}</td>
                                <td className='px-6 py-3'>₹ {item.amount}</td>
                                <td className='px-6 py-3'>{categories.map((category)=>(category.id===item.categoryId)?category.name:"")}</td>
                                {console.log(typeof item.categoryId)}
                                {/* <td>{`${item.categoryId}+${categories}`}</td> */}
                                <td className='px-6 py-3'>{item.notes}</td>
                                <td className='px-6 py-3'>{item.desc}</td>
                                <td className='px-6 py-3'>{getDay(item.date)}</td>
                                <td className='px-6 py-3'><button  className="text-indigo-700 font-medium" key={item.id} name="edit" onClick={()=>handleEdit(item.id)}>Edit</button></td>
                                <td className='px-6 py-3'><button className="text-yellow-700 font-medium" key={item.id} name="delete" onClick={()=>handleDelete(item.id)}>Delete</button></td>
                                
                                </tr>
                            ))}
                        </>
                       )

                   })}
                    <tr className='text-lg  text-gray-900 font-semibold'>
                        <td colSpan={3} className="text-right">TOTAL</td>
                        <td className="text-left bg-gray-50 flex items-center justify-center">₹{totalIncome-totalExpense}</td>
                        <td colSpan={6}></td>
                    </tr>
                     
                    
                     
                    
                </tbody>
            </table>
        </div>
    )
}

export default ShowTransaction;