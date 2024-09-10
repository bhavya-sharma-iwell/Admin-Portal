import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk for fetching user table data
export const GetUserTableListData = createAsyncThunk(
  'user/GetUserTableListData',
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/api/admin/users/getUsersWithIfaInfo',
        params: param,
      })

      if (response.status == 0) {
        return response.result;
      } else {
        return rejectWithValue(response.result ? response.message : 'Unexpected API response');
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const ifaTable = createSlice({
  name: 'ifaLookup',
  initialState: {
    userTableData: {
      data: null,
      errorMsg: null,
      status: null, 
    },
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUserTableListData.pending, (state) => {
        state.loading = true
        state.userTableData = { ...state.userTableData, status: null, errorMsg: null }
      })
      .addCase(GetUserTableListData.fulfilled, (state, action) => {
        state.loading = false
        state.userTableData = { ...state.userTableData, data: action.payload, status: 0 }
      })
      .addCase(GetUserTableListData.rejected, (state, action) => {
        state.loading = false
        state.userTableData = { ...state.userTableData, errorMsg: action.payload, status: -1 }
      })
  },
})

export default ifaTable.reducer