import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  isAuthenticated: true,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    signinSuccess(state, action){
      state.token = action.payload;
      state.isAuthenticated= true;
  },

  signOut(state){
      state.token = null;
      state.isAuthenticated= false;
  },
  },
})

// Action creators are generated for each case reducer function
export const { signinSuccess, signOut } = adminSlice.actions

export default adminSlice.reducer