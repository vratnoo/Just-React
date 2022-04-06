import React, { useEffect, useState } from 'react';


const AddCategory = ({categories,addCategory,isEdit,setIsEdit,currentCategory,updateCategory}) => {
    const initialState = {id:"",name:""}
    const [category,setCategory] = useState({})
    
    useEffect(()=>{
       
        if(isEdit && currentCategory!==""){
            const result = categories.filter((item)=>item.id===currentCategory)
            setCategory(result[0])
        }else{
            setCategory(initialState)
        }
    },[currentCategory,isEdit])

    const handleChange = (e)=>{
        setCategory({...category,name:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isEdit && currentCategory!==""){
            updateCategory(category)
            setIsEdit(false)
            setCategory(initialState)
        }else{
            addCategory({...category,id:Date.now()})
            setCategory(initialState)
        }

    }
        
    return ( <div>
        <h2>{!isEdit?"Add Category":"Edit Category"}</h2>
        <p>id: {category.id}</p>
            <form onSubmit={handleSubmit}>
                <label> Name </label>
                <input type="text" name="name" value={category.name} onChange={handleChange}/>
                <button>{!isEdit?"SAVE":"UPDATE"}</button>
            </form>
    </div> );
}
 


const ViewCategory = ({categories,currentCategory,setIsEdit,editCategory,deleteCategory,handleEdit}) => {
    
    const handleDelete  = (id)=>{
        deleteCategory(id)
        if(currentCategory==id){
            setIsEdit(false)
        }
    }



    return ( <div>
        <table>
            <tr>
                <td>ID</td>
                <td>sr.no</td>
                <td>Name</td>
                <td colSpan={2}>action</td>
            </tr>
            {categories.map((item,index)=>(
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{index+1}</td>
                <td>{item.name}</td>
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
            <ViewCategory {...ExtraProps}/>
            <AddCategory {...ExtraProps}/>
        </>
      );
}
 
export default Category;
 