import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // ✅ use this if your install is okay
import { composeWithDevTools } from "redux-devtools-extension";
import productReducer, { productDetailsReducer } from "./Reducers/productReducer";
import {userReducer} from './Reducers/userReducer.jsx'
const reducer = combineReducers({
  products: productReducer,
  productDetails:productDetailsReducer,
  user:userReducer
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
