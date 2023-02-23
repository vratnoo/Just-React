import React, { Children, useEffect, useState } from 'react';
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
import {DialogTrigger}from '@radix-ui/react-dialog';

const DialogDemo = ({children,isEdit,isOpen,setIsOpen }) => {



return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
     <DialogTrigger  asChild>
        <button className="bg-gray-600 text-white py-1 px-3" size="large">
          Add Category
        </button>
      </DialogTrigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent ">
          <Dialog.Title className="DialogTitle">{(isEdit)?"Edit Category":"Add Category"}</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          {children}
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
}

const AddCategory = ({isEdit,setIsEdit,currentCategory,open,handleOpen}) => {
    const initialState = {id:"",name:"",type:transType.EXPENSE}
    const categories  = useSelector(fetchCategories)
    const [category,setCategory] = useState({})
    // const [open,setOpen] = useState(false)
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
            dispatch(updateCategoryThunk(category))
            setIsEdit(false)
            setCategory(initialState)
        }else{
            // addCategory({...category,id:Date.now()})
            console.log("added transaction")
            dispatch(addCategoryThunk(category))
            // dispatch(categoryAdd({...category,id:Date.now()}))
            setCategory(initialState)
        }
        handleOpen(false)

    }
        
    return ( 
      <>
       

       <DialogDemo isEdit={isEdit} isOpen={open} setIsOpen={handleOpen}>
    <div>
        {isEdit &&(<p>id: {category.id}</p>)}
            <form  onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <div className='flex  items-center'>
                <label className='text-lg font-medium w-1/5'> Name </label>
                <input className='border border-gray-500 w-4/5 rounded-md py-1 px-3' type="text" name="name" value={category.name} onChange={handleChange}/>
              </div>
              <div className='flex  items-center'>
              <label className='text-lg font-medium w-1/5'> Type </label>
                <select  className='w-4/5 border border-gray-500 rounded-md py-1 px-3' name="type" value={category.type} onChange={handleChange}>
                {Object.keys(transType).map((key,index)=><option value={transType[key]}>{key}</option>)}
                </select>
              </div>
              
                <button  className='bg-gray-800 text-white py-2 px-3 rounded-md hover:bg-gray-700'>{!isEdit?"SAVE":"UPDATE"}</button>

            </form>
    </div> 
        </DialogDemo>
      </>
    );
}

export default AddCategory