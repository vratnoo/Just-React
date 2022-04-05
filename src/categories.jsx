import React, { useEffect, useState } from 'react';


const AddCategory = ({addCategory}) => {
    const initialState = {id:Date.now(),name:""}
    const [category,setCategory] = useState({})
    
    useEffect(()=>{
        setCategory(initialState)
    },[])

    const handleChange = (e)=>{
        setCategory({...category,name:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        // addCategory(category)
        setCategory(initialState)
    }
        
    return ( <div>
            <form onSubmit={handleSubmit}>
                <label> Name </label>
                <input type="text" name="name" value={category.name} onChange={handleChange}/>
                <button>SAVE</button>
            </form>
    </div> );
}
 


const ViewCategory = ({categories,editCategory,deleteCategory}) => {

    return ( <div>
        <table>
            <tr>
                <td>sr.no</td>
                <td>Name</td>
                <td colSpan={2}>action</td>
            </tr>
            {categories.map((item,index)=>(
                <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td><button onClick={()=>editCategory(item.id)}>Edit</button></td>
                <td><button onClick={()=>deleteCategory(item.id)}>Delete</button></td>
                </tr>
            ))}
            
        </table>
    </div> );
}

const Category = (props) => {
    const {} = props
    useEffect(()=>{

    },[])
    return (
        <>
            <ViewCategory {...props}/>
            <AddCategory {...props}/>
        </>
      );
}
 
export default Category;
 