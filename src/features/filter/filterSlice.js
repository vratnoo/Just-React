const todayMonth = new Date(2022,4,20); 
const initailState = {
    month:todayMonth
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
            
            
    
        default:{
            return state
        }
            
    }
}

// selector

export const fetchFilterMonth = (state)=>state.filters.month

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


