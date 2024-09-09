import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  brokerListData: [],
  loading: false,
  error: null,
};

// Define asynchronous thunk action for fetching broker list
export const getBrokerList = createAsyncThunk(
  'broker/getBrokerList',
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/api/admin/getBrokers',
        params: param
      });
      if (response.status === 0) {
        return response.result;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Define broker slice
const brokerSlice = createSlice({
  name: 'broker',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrokerList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrokerList.fulfilled, (state, action) => {
        state.brokerListData = action.payload;
        state.loading = false;
      })
      .addCase(getBrokerList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

// Export reducer
export default brokerSlice.reducer;
