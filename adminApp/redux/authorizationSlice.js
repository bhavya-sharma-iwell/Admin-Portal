import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for getting the authorization key
export const GetAuthorizationKey = createAsyncThunk(
  'auth/getAuthorizationKey',
  async (param, { rejectWithValue }) => {
    try {
      // Triggering the loader
      return await axios.post('/api/admin/users/getAuthorizationKey', param)
        .then(response => {
          if (response.status === 0) {
            return response.result && response.result.data;
          } else {
            return rejectWithValue(response.message);
          }
        });
    } catch (error) {
      // Rejecting with an error message
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  authorizationKey: null,
  notificationStatus: null,
  errorNotification: false,
  loading: false
};

// Create a slice for authorization
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state for API call
      .addCase(GetAuthorizationKey.pending, (state, action) => {
        state.loading = true;
        state.errorNotification = false;
      })
      // Fulfilled state when API is successful
      .addCase(GetAuthorizationKey.fulfilled, (state, action) => {
        state.authorizationKey = action.payload;
        state.loading = false;
        state.notificationStatus = null;
      })
      // Rejected state when API fails
      .addCase(GetAuthorizationKey.rejected, (state, action) => {
        state.loading = false;
        state.notificationStatus = action.payload;
        state.errorNotification = true;
      });
  }
});

// Export the reducer to be used in the store
export default authSlice.reducer;
