import { transType } from "../transaction/transactionSlice"
const initailState = {
    entities:[
        {id:1,name:"Food",type:transType.EXPENSE},
        {id:2,name:"Bills",type:transType.EXPENSE},
        {id:3,name:"Transport",type:transType.EXPENSE},
        {id:4,name:"Salary",type:transType.INCOME}
    ]
}


export const categoryReducer = (state=initailState,action)=>{

    switch(action.type){
        case 'categories/categoryAdd':{
            return {...state,entities:[...state.entities,action.payload]}
        }
        case 'categories/categoryUpdate':{
            const updatedCategory = action.payload
            return {...state,entities:state.entities.map((item)=>item.id === updatedCategory.id?updatedCategory:item )}
        }

        case 'categories/categoryDelete':{
            const deletedCategoryId = action.payload
            return {...state,entities:state.entities.filter((item)=>item.id !== deletedCategoryId)}
        }
        default:{
            return state
        }
    }
}

// action creator
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
