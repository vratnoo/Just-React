import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './component/loader';
import {
  fetchCategories,
  categoryAdd,
  categoryUpdate,
  categoryDelete,
  addCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk
} from "./features/categories/categorySlice";
import {transType} from './features/transaction/transactionSlice'

const AddCategory = ({addCategory,isEdit,setIsEdit,currentCategory,transactionType,updateCategory}) => {
    const initialState = {id:"",name:"",type:transType.EXPENSE}
    const categories  = useSelector(fetchCategories)
    
    const [category,setCategory] = useState({})
    const dispatch = useDispatch()
    useEffect(()=>{
       
        if(isEdit && currentCategory!==""){
            const result = categories.filter((item)=>item.id===currentCategory)
            setCategory(result[0])
        }else{
            setCategory(initialState)
        }
    },[currentCategory,isEdit])

    const handleChange = (e)=>{
        const name = e.target.name
        setCategory({...category,[name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isEdit && currentCategory!==""){
            // updateCategory(category)
            dispatch(updateCategoryThunk(category))
            // dispatch(categoryUpdate(category))
            setIsEdit(false)
            setCategory(initialState)
        }else{
            // addCategory({...category,id:Date.now()})
            dispatch(addCategoryThunk(category))
            // dispatch(categoryAdd({...category,id:Date.now()}))
            setCategory(initialState)
        }

    }
        
    return ( <div>
       
        <h2>{!isEdit?"Add Category":"Edit Category"}</h2>
        <p>id: {category.id}</p>
            <form onSubmit={handleSubmit}>
                <label> Name </label>
                <input type="text" name="name" value={category.name} onChange={handleChange}/>
                <label> Type </label>
                <select name="type" value={category.type} onChange={handleChange}>
                {Object.keys(transType).map((key,index)=><option value={transType[key]}>{key}</option>)}
                </select>
                <button>{!isEdit?"SAVE":"UPDATE"}</button>
            </form>
    </div> );
}
 


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



    return ( <div>
        <table>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Mode</td>
                <td colSpan={2}>action</td>
            </tr>
            {categories.map((item,index)=>(
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{transType.INCOME==item.type?"INCOME":"EXPENSE"}</td>

                <td><button onClick={()=>handleEdit(item.id)}>Edit</button></td>
                <td><button onClick={()=>handleDelete(item.id)}>Delete</button></td>
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
        <>
            <Loader loadingStatus={loadingStatus} />
            <ViewCategory {...ExtraProps}/>
            <AddCategory {...ExtraProps}/>
        </>
      );
}
 
export default Category;
 