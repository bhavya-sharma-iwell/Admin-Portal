import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  user: null,
  loggedIn: false,
  loginFail: false,
  errorMsg: '',
  apiStatus: 1
};

// Define asynchronous thunk action
export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({method:'GET',url:'/api/auth/getLoggedInUser',param:{}});
      if (response.status == 0) {
        return response.result; 
      } else {
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loginFail = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.user = { errorMsg: action.payload };
        state.loginFail = true;
      });
  }
});

// Export reducer
export default userSlice.reducer;
