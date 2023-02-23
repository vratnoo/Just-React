import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  transactionAdd,
  transType,
  accounts,
  fetchTransaction,
  transactionUpdate,
  addTransactionThunk,
  updateTransactionThunk,
} from "./transactionSlice";
import { fetchCategories } from '../categories/categorySlice';
import { getDate,isValidDate,todayDate } from '../../helper/utility';
import classNames from 'classnames';

const AddTransaction = (props)=>{
    const {editId,setEditId,setIsOpen} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allTransaction = useSelector(state=>state.transactions.entities)
    const transactionList = useSelector(fetchTransaction)
    const categories = useSelector(fetchCategories)
    const loadingStatus = useSelector(state=>state.transactions.status)
    const [type,setType] = useState(transType.INCOME)
    
    const initialState = {type:type,date:todayDate(),amount:0,accountId:'cash',categoryId:'0',notes:"",desc:""}
    const [transaction,setTransaction] = useState(initialState)

    // console.log("transactionList here: ",allTransaction)
    useEffect(()=>{

        console.log("props",props)
        if(editId){

            if(editId!==null){
                // console.log(transactionList)
                const currentTransaction = transactionList.find((item)=>item.id==editId)
                // console.log(currentTransaction)
                setTransaction(currentTransaction)
                setType(currentTransaction.type)
            }else{
                
                setTransaction(initialState)
                setType(transType.EXPENSE)
                setEditId(null)
            }
        

        }
            
        

    },[editId])

    const handleChange = (e)=>{
        let name = e.target.name
        let value=  e.target.value
        if(name=="account"){
            name = "accountId"
            console.log(value)
        }

        if(name=='amount'){
            value = parseInt(value)
        }

        if(name=="category"){
            name = "categoryId"
        }
        if(name=="date"){
            // console.log("invalid date si ",value)
            if(isValidDate(value)){
                value = new Date(value).toISOString().slice(0, 10)
            }else{
                value = new Date().toISOString().slice(0, 10)
            }
        }
        setTransaction({...transaction,[name]:value})
        // console.log(transaction)
        
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // setTransaction({...transaction,id:Date.now()})
        // console.log('added/updated transaction',transaction)
        if(editId && editId!==null){
            dispatch(updateTransactionThunk(transaction))  
            setIsOpen((oldState)=>false)

            // updateTransaction({...transaction,type:type})  
        }else{
            dispatch(addTransactionThunk(transaction))
            setIsOpen((oldState)=>false)
            // addTransaction({...transaction,id:Date.now(),type:type})
        }
        setTransaction(initialState)

    }
        

        
       

    const handleClick = (item)=>{
        
        if(type!=item){
            setType(item)
            setTransaction({...transaction,type:item})
        }

    }
    const loader = <div className='loader'><div className="lds-ripple"><div></div><div></div></div></div>
    return(

        <div className="w-full p-5">
            {loadingStatus=='loading'?loader:''}
            <div className="flex flex-col justify-center items-center sm:justify-between sm:flex-row">
                <h2 className='text-2xl text-gray-700 font-bold'>{editId && editId!==null?("Edit Transaction"):"Add Transaction"}</h2>
                
            <TabComponent first="income" second="expanse" initState={type==transType.INCOME?true:false} onClick={handleClick}/>
            </div>
            <form className="mx-auto max-w-2xl" onSubmit={handleSubmit}>
                <div className="flex flex-col  py-4 px-5">
                     <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between py-2">
                        <div className='flex gap-1 items-center'>
                            <label className='text-md w-36 font-medium text-gray-600'>Date</label>
                            <input className="border border-gray-300 rounded-md px-3 min-w-xl py-1" type="date" name="date"  value={getDate(transaction.date)} onChange={handleChange}/>
                        </div>
                            <div className='flex gap-1 items-center'>
                            <label className='text-md  w-36 font-medium text-gray-600'>Account : </label>
                            <select className="border border-gray-300 rounded-md px-3 min-w-xl py-1" name="account"  value={transaction.accountId} onChange={handleChange} >
                                {accounts.map((item)=>( <option key={item.id} value={item.id}>{item.name}</option>))}
                            
                            </select>
                        </div>
                     </div>
                     
                     <div className="w-full flex justify-between py-2">
                        <div className='flex gap-1 items-center'>
                            <label className='text-md w-36 font-medium text-gray-600'>Category : </label>
                            <select className="border border-gray-300 rounded-md px-3 min-w-xl py-1" name="category" value={transaction.categoryId} onChange={handleChange}>
                                <option value={0}>No select</option>
                                {categories.map((item) => {
                                    if (item.type == transaction.type) {
                                        return (<option key={item.id} value={item.id}>{item.name}</option>)
                                    }


                                })}
                            </select>

                        </div>
                     </div>

                     <div className="w-full flex justify-between py-2">
                        <div className="flex gap-1 items-center">
                            <label className='text-md w-36 font-medium text-gray-600'>Amount:</label>
                            <input className="border border-gray-300 rounded-md px-3 min-w-xl py-1" type="number" name="amount" value={transaction.amount} onChange={handleChange} />
                        </div>
                     </div>


        

                     <div className="w-full flex justify-between py-2">
                        <div className="flex gap-1 items-center">
                                <label className='text-md w-36 font-medium text-gray-600'>Notes</label>
                                <input className="border border-gray-300 rounded-md px-3 min-w-xl py-1" type="text" name="notes"  value={transaction.notes} onChange={handleChange}/>
                        </div>
                     </div>



                     <div className="w-full   py-2">

                        <div className="flex gap-1 items-center">
                            <label className='text-md w-36 block font-medium text-gray-600'>Description : </label>
                            <input type="text"  className="border border-gray-300 rounded-md px-3 min-w-xl py-1" name="desc" onChange={handleChange}  value={transaction.desc} placeholder='Enter here Something.'/>


                        </div>

                     </div>
            <div className="w-full flex justify-between py-2">
                <button className='bg-gray-900 text-white hover:bg-gray-600 font-semibold text-md px-3 py-1 rounded-md'>SAVE</button>

            </div>

                </div>
            
                
            
              
                
            

            </form>
        </div>
    )
}


function TabComponent({initState,first,second,onClick}) {
    const [tabState,setTabState] = useState(initState)
    const handleClick = (e,value)=>{
        e.preventDefault()
        if(value){
            setTabState(true)
            onClick(transType.INCOME)
        }else{
            setTabState(false)
            onClick(transType.EXPENSE)
        }

    }
    return (  
        <div className='bg-slate-200 py-1 px-2 rounded-md font-medium'>
            <button className={classNames('text-md  rounded-sm py-1 px-3 ',{'bg-white font-semibold':tabState})} onClick={(e)=>handleClick(e,true)}>{first}</button>
            <button className={classNames('text-md  rounded-sm py-1 px-3 ',{'bg-white font-semibold':!tabState})} onClick={(e)=>handleClick(e,false)}>{second}</button>
        </div>
    );
}

export default AddTransaction;