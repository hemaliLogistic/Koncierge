"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { authApiSliceReducer } from "./Auth/AuthSlice";
import { dashboardApiSliceReducer } from "./Dashboard/DashboardSlice";
import { homeApiSliceReducer } from "./Home/HomeSlice";
import { chatApiSliceReducer } from "./Chat/ChatSlice";

const rootReducer = combineReducers({
    registerApi: authApiSliceReducer,
    dashboardApi: dashboardApiSliceReducer,
    homeApi: homeApiSliceReducer,
    chatApi: chatApiSliceReducer
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
