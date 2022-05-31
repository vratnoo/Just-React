const todayMonth = new Date(2022,4,20); 
const initailState = {
    month:todayMonth,
    search:'',
}


export const filterReducer = (state=initailState,action)=>{

    switch (action.type) {
        case 'filters/currentMonthIncrease':{
            const increasedDate = new Date(state.month.getFullYear(),state.month.getMonth()+1,1)
            return {...state,month:increasedDate}
        }
        case 'filters/currentMonthDecrease':{
            const decreasedDate = state ? new Date(state.month.getFullYear(),state.month.getMonth()-1) : todayMonth;
            return {...state,month:decreasedDate}
        }
        case 'filters/search':{
            return {...state,search:action.payload}
        }
            
            
    
        default:{
            return state
        }
            
    }
}

// selector

export const fetchFilterMonth = (state)=>state.filters.month
export const fetchSearchFilter = (state)=>state.filters.search

// action creator
export const currentMonthIncrease = ()=>{
    return{
        type:'filters/currentMonthIncrease',
        
    }
}   // action creator
export const currentMonthDecrease = ()=>{
    return{
        type:'filters/currentMonthDecrease',
    }
}

export const searchFilter = (search)=>{
    return{
        type:'filters/search',
        payload:search
    }
}

