import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slices'
import productReducer from './slices/productSlice'

const store = configureStore({
    reducer: {
        userActions: userReducer,
        products : productReducer

    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store