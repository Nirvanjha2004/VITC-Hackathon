import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
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
export const { signinSuccess, signOut } = userSlice.actions

export default userSlice.reducer