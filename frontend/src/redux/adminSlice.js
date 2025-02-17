import { createSlice } from '@reduxjs/toolkit'
import { getAdminData, getAdminToken } from '../utilities/handleToken'

const initialState = {
    admin: getAdminData() || null,
    token: getAdminToken() || null,
    loading: false,
    error: null,
    message: null
  }

const adminSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    register: (state, action) => {
        state.admin = action.payload.admin
        state.token = action.payload.token
      },
    login: (state, action) => {
      state.admin = action.payload.admin
      state.token = action.payload.token
    }

  }
})

export const { register,login} =
adminSlice.actions
export default adminSlice.reducer


