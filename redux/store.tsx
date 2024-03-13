/// <reference types="redux-persist" />
import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import userReducer from './userSlice';
import blogReducer from './blogs/blogsCreateSlice';
import blogsFetchAllReducer from './blogs/blogFetchSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    timeout:2000
};

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    blogs: blogReducer,
    fetch_all_blogs:blogsFetchAllReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const persistor = persistStore(store);
export default store;
