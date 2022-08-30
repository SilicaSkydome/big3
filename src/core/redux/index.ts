import { combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice';

const rootReducer = combineReducers({
    authReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export default store;