import { transactionReducer } from "./features/transaction/transactionSlice";
import { categoryReducer } from "./features/categories/categorySlice";
import { combineReducers } from "redux";



const rootReducer = combineReducers({
    transactions:transactionReducer,
    categories:categoryReducer
})


export default rootReducer