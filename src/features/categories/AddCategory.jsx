import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import * as Dialog from '@radix-ui/react-dialog';

const DialogDemo = () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet" size="large">
          Edit profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input className="Input" id="name" defaultValue="Pedro Duarte" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Username
            </label>
            <input className="Input" id="username" defaultValue="@peduarte" />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              {/* <Cross2Icon /> */}
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
  

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
       <DialogDemo/>
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

export default AddCategory