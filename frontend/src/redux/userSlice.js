import { createSlice } from '@reduxjs/toolkit'
import { getUserData, getUserToken } from '../utilities/handleToken'


const initialState = {
  user: getUserData() || null,
  token: getUserToken() || null,
  loading: false,
  error: null,
  message: null
}

const userSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    login: ((state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    })

  }
})

export const { register,login} =
userSlice.actions
export default userSlice.reducer
