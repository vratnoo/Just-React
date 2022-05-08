import { transactionReducer } from "./features/transaction/transactionSlice";
import { categoryReducer } from "./features/categories/categorySlice";
import { filterReducer } from "./features/filter/filterSlice";
import { combineReducers } from "redux";



const rootReducer = combineReducers({
    transactions:transactionReducer,
    categories:categoryReducer,
    filters:filterReducer
})


export default rootReducer