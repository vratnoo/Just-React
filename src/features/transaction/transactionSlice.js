export const transType = {
    INCOME:'income',
    EXPENSE:'expense'
}
const today = new Date().toISOString().slice(0, 10)

const initailState = {
  entities: [
    {
      id: Date.now(),
      type: transType.INCOME,
      date: today,
      amount: 3000,
      accountId: 0,
      categoryId: 3,
      notes: "",
      desc: "",
    },
  ],
};

export function transactionReducer(state = initailState, action) {
  switch (action.type) {
    case "transaction/transactionAdded": {
      return {...state,entities:[...state.entities,action.payload]};
    }
    case "transaction/transactionUpdate": {
      const updatedTransaction = action.payload
      return {...state,entities:state.entities.map(item=>item.id===updatedTransaction.id?updatedTransaction:item)};
    }
    case "transaction/transactionDelete": {
      const deletedTransactionId = action.payload
      return {...state,entities:state.entities.filter(item=>item.id!==deletedTransactionId)};
    }

    default:{
        return state
    }
  }
}


// action creator
export  const transactionAdd = (data)=>{
    
    return{
        type:'transaction/transactionAdded',
        payload:data
    }
}

export const trabsactionDelete =  (transactionId)=>{
  return{
    type:'transaction/transactionDelete',
    payload:transactionId
  }
}

export const transactionUpdate = (data)=>{
  return{
    type:'transaction/transactionUpdate',
    payload:data
  }
}

// selectors
export const fetchTransaction = (state)=>{
  return state.transactions

}