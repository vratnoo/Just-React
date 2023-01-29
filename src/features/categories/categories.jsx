import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../component/loader';
import {
  fetchCategories,
  categoryAdd,
  categoryUpdate,
  categoryDelete,
  addCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk
} from "./categorySlice";
import {transType} from '../transaction/transactionSlice'
import classNames from 'classnames';
import AddCategory from './AddCategory';
 


const ViewCategory = ({currentCategory,setIsEdit,editCategory,deleteCategory,handleEdit,transactionType}) => {
    const categories = useSelector(fetchCategories)
    const dispatch  = useDispatch()
    const handleDelete  = (id)=>{
        // deleteCategory(id)
        // dispatch(categoryDelete(id))
        dispatch(deleteCategoryThunk(id))
        if(currentCategory==id){
            setIsEdit(false)
        }
    }



    return ( <div className=' p-5 max-w-3xl mx-auto'>
        <table className='w-full divide-dashed divide-y-2'>
            <tr className='bg-gray-100 uppercase font-medium'>
                <td className='py-1 px-3'>ID</td>
                <td className='py-1 px-3'>Name</td>
                <td className='py-1 px-3'>Mode</td>
                <td className='py-1 px-3' colSpan={2}>action</td>
            </tr>
            {categories.map((item,index)=>(
                <tr  className="bg-white" key={item.id}>
                <td className='py-1 px-2'>{item.id}</td>
                <td className='py-1 px-2'>{item.name}</td>
                <td className={classNames("font-medium",{"text-green-800":item.type==transType.INCOME,"text-red-800":item.type==transType.EXPENSE})}>{transType.INCOME==item.type?"INCOME":"EXPENSE"}</td>

                <td className='text-indigo-700 font-medium'><button onClick={()=>handleEdit(item.id)}>Edit</button></td>
                <td className='text-orange-700 font-medium'><button onClick={()=>handleDelete(item.id)}>Delete</button></td>
                </tr>
            ))}
            
        </table>
    </div> );
}

const Category = (props) => {
    const {categories} = props
    const [isEdit,setIsEdit] = useState(false)
    const [currentCategory,setCurrentCategory] = useState("")
    const loadingStatus = useSelector(state=>state.categories.status)

    const handleEdit = (id)=>{
        setIsEdit(true)
        setCurrentCategory(id)
    }


    useEffect(()=>{
        console.log(categories)
    },[categories])
    const ExtraProps = {...props,isEdit,setIsEdit,handleEdit,currentCategory}
    return (
        <div className='px-4 py-4'>
            <Loader loadingStatus={loadingStatus} />
            <div className='flex justify-end'><button className='bg-slate-800 text-white px-3 py-0 rounded-md hover:bg-slate-500'>Add New</button></div>
            <ViewCategory {...ExtraProps}/>
            <AddCategory {...ExtraProps}/>
        </div>
      );
}
 
export default Category;
 