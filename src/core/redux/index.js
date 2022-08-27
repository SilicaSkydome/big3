import { combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'

const rootReducer = combineReducers({
    authReducer: authSlice,
})

const store = configureStore({
    reducer: rootReducer,
})