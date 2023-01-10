import { transType } from "../transaction/transactionSlice"
import axios from "axios"
const initailState = {
    entities:[
        {id:'1',name:"Food",type:transType.EXPENSE},
        {id:'2',name:"Bills",type:transType.EXPENSE},
        {id:'3',name:"Transport",type:transType.EXPENSE},
        {id:'4',name:"Salary",type:transType.INCOME}
    ]
}


export const categoryReducer = (state=initailState,action)=>{

    switch(action.type){
        case 'categories/categoryLoading':{
            return {...state,status:'loading'}
        }
        case 'categories/categoryLoaded':{
            return {...state,status:'idle',entities:action.payload}
        }
        case 'categories/categoryAdd':{
            return {...state,status:'idle',entities:[...state.entities,action.payload]}
        }
        case 'categories/categoryUpdate':{
            const updatedCategory = action.payload
            return {...state,status:'idle',entities:state.entities.map((item)=>item.id === updatedCategory.id?updatedCategory:item )}
        }

        case 'categories/categoryDelete':{
            const deletedCategoryId = action.payload
            return {...state,status:'idle',entities:state.entities.filter((item)=>item.id !== deletedCategoryId)}
        }
        default:{
            return state
        }
    }
}

// action creator
export const categoryLoading = ()=>{
    return {
        type: "categories/categoryLoading",
    };
}

export const categoryLoaded = (categories)=>{
    return {
        type: "categories/categoryLoaded",
        payload: categories,
    };
}
export const categoryAdd = (category)=>{
    return {
        type:'categories/categoryAdd',
        payload:category
    }
}

export const categoryUpdate = (category)=>{
    return {
        type:'categories/categoryUpdate',
        payload:category
    }
}

export const categoryDelete = (categoryId)=>{
    return {
        type:'categories/categoryDelete',
        payload:categoryId
    }
}

// selector
export const fetchCategories = (state)=>{
    return state.categories.entities
}



export const fetchCategoriesThunk = ()=>{
    return async (dispatch)=>{
        dispatch(categoryLoading())
        const response = await axios.get('http://localhost:8080/categories')
        const categories = response.data.map(item=>({id:item._id,...item}))
        dispatch(categoryLoaded(categories))
    }
}

export const addCategoryThunk = (category)=>{
    return async (dispatch)=>{
        dispatch(categoryLoading())
        const response = await axios.post('http://localhost:8080/categories/new',category)
        dispatch(categoryAdd({...category,id:response.data.id}))
    }
}

export const updateCategoryThunk = (category)=>{
    return async (dispatch)=>{
        dispatch(categoryLoading())
        const response = await axios.put(`http://localhost:8080/categories/${category.id}`,category)
        dispatch(categoryUpdate(category))
    }
}

export const deleteCategoryThunk = (categoryId)=>{
    return async (dispatch)=>{
        dispatch(categoryLoading())
        const response = await axios.delete(`http://localhost:8080/categories/${categoryId}`)
        dispatch(categoryDelete(categoryId))
    }
}