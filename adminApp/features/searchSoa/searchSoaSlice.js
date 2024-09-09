import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { COMPONENT_LOADER_FOLIO_ID_DATA } from './features/commonReducerSlice';
import axios from 'axios';

// Define initial state
const initialState = {
  searchFolioNumData:{ apiStatus: 1, data: null, errorMsg: null },
  loaderSearchFolio: false,
};

// Define asynchronous thunk action
export const getFolioData = createAsyncThunk(
  'searchSoa/getFolioData',
  async (_, { rejectWithValue }) => {
    try {
      dispatch(COMPONENT_LOADER_FOLIO_ID_DATA(param.componentForLoader));
      const response = await axios({method:'GET',url:'/api/admin/getFolioData',param:{}});
      if (response.status == 0) {
        dispatch(COMPONENT_LOADER_FOLIO_ID_DATA(null));
        return response.result; 
      } else {
        dispatch(COMPONENT_LOADER_FOLIO_ID_DATA(null));
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getSearchSoaData = createAsyncThunk(
  'searchSoa/getSearchSoaData',
  async (_, { rejectWithValue }) => {
    try {
      dispatch(COMPONENT_LOADER_FOLIO_ID_DATA(param.componentForLoader));
      const response = await axios({method:'GET',url:'/api/admin/getSOA',param:{}});
      if (response.status == 0) {
        dispatch(COMPONENT_LOADER_FOLIO_ID_DATA(null));
        return response.result; 
      } else {
        dispatch(COMPONENT_LOADER_FOLIO_ID_DATA(null));
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'searchSoa',
  initialState,
  reducers: {
    setLoader: (state,action) => {
      state.loaderSearchFolio = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFolioData.pending, (state) => {
        state.searchFolioNumData.apiStatus = 1
      })
      .addCase(getFolioData.fulfilled, (state, action) => {
        state.searchFolioNumData = { data: action.payload, apiStatus: 0 }
      })
      .addCase(getFolioData.rejected, (state, action) => {
        state.searchFolioNumData = { errorMsg: action.payload, apiStatus: -1};
        state.loaderSearchFolio = false;
      });
  }
});

// Export reducer
export default userSlice.reducer;
