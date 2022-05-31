import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilterMonth,currentMonthIncrease,currentMonthDecrease, fetchSearchFilter, searchFilter } from './filterSlice'
const MonthFilter = () => {
    const dispatch = useDispatch()
    const filterMonth = useSelector(fetchFilterMonth)
    
    const monthString = filterMonth.toLocaleString('default', { month: 'long',year:'numeric' }) 
    const handleClick = (e,type)=>{

        switch(type){
            case 'prev':{
                dispatch(currentMonthDecrease())
                break;
            }
            case 'next':{
                dispatch(currentMonthIncrease())
                break;
            }
        }
    }
  return (
    <div className='top-filter'>
        <button onClick={(e)=>handleClick(e,"prev")}>Prev</button>
        <p>{monthString}</p>
        <button onClick={(e)=>handleClick(e,"next")}>next</button>
    </div>
  )
}


const SearchFilter = ()=>{
    const dispatch = useDispatch()
    const SearchString = useSelector(fetchSearchFilter)
    const handleChange = (e)=>{
        const value  = e.target.value
        if(value!==""){
            dispatch(searchFilter(value))
        }else{
            dispatch(searchFilter(value))
        }
            
    }

    return(
        <div className='searchFilter'>
            <input type="text"  placeholder='search' name="search" onChange={handleChange} value={SearchString}/>
            <button name='reset' onClick={()=>dispatch(searchFilter(""))}>Reset</button>
        </div>
    )
}

const Filters = ()=>{
    return(
        <>
        <MonthFilter/>
        <SearchFilter/>
        </>
    )
}

export default Filters