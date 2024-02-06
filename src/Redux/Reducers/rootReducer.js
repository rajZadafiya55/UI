import {combineReducers} from "redux";
import { itemsReducer } from "./itemReducer";
import { reviewReducer } from "./reviewReducer";
import { cartReducer } from "./cartReducer";
import { tableReducer } from "./tableReducer";
import { paymentsReducer } from "./paymentReducer";

const rootReducer = combineReducers({
    item:itemsReducer,
    review:reviewReducer,
    cart: cartReducer,
    table:tableReducer,
    payment:paymentsReducer
})

export default rootReducer;