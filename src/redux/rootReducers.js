import { combineReducers } from "redux";
import { authApiSliceReducer } from "./Auth/AuthSlice";
import { dashboardApiSliceReducer } from "./Dashboard/DashboardSlice";
import { homeApiSliceReducer } from "./Home/HomeSlice";
import { chatApiSliceReducer } from "./Chat/ChatSlice";

const rootReducers = combineReducers({
    registerApi: authApiSliceReducer,
    dashboardApi: dashboardApiSliceReducer,
    homeApi: homeApiSliceReducer,
    chatApi: chatApiSliceReducer
});

export default rootReducers;
