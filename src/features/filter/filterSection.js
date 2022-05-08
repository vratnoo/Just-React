import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilterMonth,currentMonthIncrease,currentMonthDecrease } from './filterSlice'
const FilterSection = () => {
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

export default FilterSection