import { collection, addDoc, doc,getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore/lite";
import { firestore } from "../../firebase";
import { todayDate } from "../../helper/utility";
import axios from "axios";
export const transType = {
    INCOME:'income',
    EXPENSE:'expense'
}

const initailState = {
  status:'idle',
  entities: [
    {
      id: Date.now().toString(),
      type: transType.INCOME,
      date: todayDate(),
      amount: 3000,
      accountId: 'cash',
      categoryId: '3',
      notes: "",
      desc: "",
    },
  ],
};

export function transactionReducer(state = initailState, action) {
  switch (action.type) {
    case "transaction/transactionLoaded": {
      return {...state,entities:action.payload,status:'idle'};
    }
    case "transaction/transactionLoading": {
      return {...state,status:'loading'};
    }
    case "transaction/transactionAdded": {
      return {...state,entities:[...state.entities,action.payload],status:'idle'};
    }
    case "transaction/transactionUpdate": {
      const updatedTransaction = action.payload
      return {...state,status:'idle',entities:state.entities.map(item=>item.id===updatedTransaction.id?updatedTransaction:item)};
    }
    case "transaction/transactionDelete": {
      const deletedTransactionId = action.payload
      return {...state,status:'idle',entities:state.entities.filter(item=>item.id!==deletedTransactionId)};
    }

    default:{
        return state
    }
  }
}


// action creator
export function transactionLoaded(transactions) {
  return {
    type: "transaction/transactionLoaded",
    payload: transactions,
  };
}
const transactionLoading = ()=>{
  return {
    type: "transaction/transactionLoading",
  };
}
export  const transactionAdd = (data)=>{
    
    return{
        type:'transaction/transactionAdded',
        payload:data
    }
}

export const transactionDelete =  (transactionId)=>{
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
  return state.transactions.entities

}

// thunk function 

// export const fetchTransactionThunk = ()=> async (dispatch,getState)=>{
//     dispatch(transactionLoading())
//     const transactionCol = collection(firestore,'TRANSACTION');
//     const response = await getDocs(transactionCol);
//     const transactionList = response.docs.map(doc=>doc.data());
//     dispatch(transactionLoaded(transactionList))

// }

export const fetchTransactionThunk = ()=> async (dispatch,getState)=>{
  dispatch(transactionLoading())
  const response = await axios.get('http://localhost:8080/transaction')
  const transactionList = response.data.map(item=>({...item,id:item._id,}));
  console.log("transactions is herer",transactionList)
  dispatch(transactionLoaded(transactionList))

}

// export const addTransactionThunk = (data)=>async (dispatch,getState)=>{
//    dispatch(transactionLoading())
//     // const transactionCol = collection(firestore,'TRANSACTION');
//     // const response = await addDoc(transactionCol,data);
//     const transactionRef = doc(collection(firestore,'TRANSACTION'));
//     await setDoc(transactionRef, {...data,id:transactionRef.id});  
  
  
//   dispatch(transactionAdd({...data,id:transactionRef.id}))
// }

export const addTransactionThunk = (data)=>async (dispatch,getState)=>{
  dispatch(transactionLoading())
  const response = await axios.post('http://localhost:8080/transaction/new',data)
  console.log(response)
  dispatch(transactionAdd({...data,id:response.data.id}))

 
}

// export const updateTransactionThunk = (data)=>async (dispatch,getState)=>{
//     dispatch(transactionLoading())
//     const transactionRef = doc(collection(firestore,'TRANSACTION'),data.id);
//     const response = await updateDoc(transactionRef,data);
//     dispatch(transactionUpdate(data))
// }

export const updateTransactionThunk = (data)=>async (dispatch,getState)=>{
  dispatch(transactionLoading())
  const response  = await axios.patch(`http://localhost:8080/transaction/${data.id}`,data)
  dispatch(transactionUpdate(data))
}

// export const deleteTransactionThunk = (transactionId)=>async (dispatch,getState)=>{
//   dispatch(transactionLoading())
//   const transactionRef = doc(collection(firestore,'TRANSACTION'),transactionId);
//   await deleteDoc(transactionRef);
//   dispatch(transactionDelete(transactionId))

// }
export const deleteTransactionThunk = (transactionId)=>async (dispatch,getState)=>{
  dispatch(transactionLoading())
  const response = await axios.delete(`http://localhost:8080/transaction/${transactionId}`)
  dispatch(transactionDelete(transactionId))

}