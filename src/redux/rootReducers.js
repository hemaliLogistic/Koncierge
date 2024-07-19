import { combineReducers } from "redux";
import { authApiSliceReducer } from "./Auth/AuthSlice";


const rootReducers = combineReducers({
  registerApi: authApiSliceReducer,
});

export default rootReducers;
