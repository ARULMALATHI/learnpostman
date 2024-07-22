import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../reducer/UserReducer";
import storage from "redux-persist/lib/storage"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'


const persistConfig={
    key:'root',
    storage
}

const presistedReducer= persistReducer(persistConfig, UserReducer)

export const store=configureStore({
    reducer:presistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],

            }
        })
    ,
})

export const persistor=persistStore(store)