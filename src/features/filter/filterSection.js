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
        <div className='flex justify-center'>
                <div className='flex py-1 items-center  m-1   border-2  border-gray-200 rounded-md border-dashed ring-gray-500'>
        <button className='flex items-center justify-center py-1 px-3 m-1 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold' onClick={(e)=>handleClick(e,"prev")}>Prev</button>
        <p className='text-md font-bold'>{monthString}</p>
        <button className='flex items-center justify-center py-1 px-3 m-1 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold' onClick={(e)=>handleClick(e,"next")}>next</button>
    </div>

        </div>
    
  )
}

export default FilterSection