import { combineReducers } from '@reduxjs/toolkit'
import userSliceReducer from '../features/counter/userSlice'
import adminSliceReducer from '../features/counter/adminSlice';

const rootReducer = combineReducers({
	user : userSliceReducer,
	admin: adminSliceReducer
})

export default rootReducer;