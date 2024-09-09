import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { COMPONENT_LOADER_FOLIO_ID_DATA,COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS, COMPONENT_LOADER_DELETE_TXN} from '../../redux/commonLoaderSlice';
import axios from 'axios';

// Define initial state
const initialState = {
  searchFolioNumData:{ apiStatus: 1, data: null, errorMsg: null },
  loaderSearchFolio: false,
  searchFolioIdData:{ apiStatus: 1, data: null, errorMsg: null },
  notification:null,
  errorMsg:null,
  deletingTxn:null,
  deletedTxn:null,
  notificationStatus:null,
  failedDeletingTxn:false

};

// Define asynchronous thunk action
export const getSearchFolioIdData = createAsyncThunk(
  'searchSoa/getSearchFolioIdData',
  async (params, { rejectWithValue,dispatch }) => {
    try {
      dispatch(COMPONENT_LOADER_FOLIO_ID_DATA(params.componentForLoader));
      const response = await axios({method:'GET',url:'/api/admin/getFolioData',params});
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
  async (params, { rejectWithValue,dispatch }) => {
    try {
      const response = await axios({method:'GET',url:'/api/admin/getSOA',params});
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

export const unFreezeFolios = createAsyncThunk(
  'searchSoa/unFreezeFolios',
  async (data, { rejectWithValue,dispatch }) => {
    try {
      dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(data.componentForLoader));
      const response = await axios({method:'POST',url:'/api/admin/unfreezeFolios',data});
      if (response.status == 0) {
        dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(null));
        return response.result; 
      } else {
        dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(null));
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const TouchFolios = createAsyncThunk(
  'searchSoa/TouchFolios',
  async (data, { rejectWithValue,dispatch }) => {
    try {
      dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(data.componentForLoader));
      const response = await axios({method:'POST',url:'/api/admin/touchFoliosList',data});
      if (response.status == 0) {
        dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(null));
        return response.result; 
      } else {
        dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(null));
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const freezeFolios = createAsyncThunk(
  'searchSoa/freezeFolios',
  async (data, { rejectWithValue,dispatch }) => {
    try {
      dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(data.componentForLoader));
      const response = await axios({method:'POST',url:'/api/admin/updateFolios',data});
      if (response.status == 0) {
        dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(null));
        return response.result; 
      } else {
        dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(null));
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteReversals = createAsyncThunk(
  'searchSoa/deleteReversals',
  async (data, { rejectWithValue,dispatch }) => {
    try {
      dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(data.componentForLoader));
      const response = await axios({method:'POST',url:'/api/admin/deleteTxnReversals',data});
      if (response.status == 0) {
        dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(null));
        return response.result; 
      } else {
        dispatch(COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS(null));
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const deleteTxn = createAsyncThunk(
  'searchSoa/deleteTxn',
  async (data, { rejectWithValue,dispatch }) => {
    try {
      dispatch(COMPONENT_LOADER_DELETE_TXN(data.componentForLoader));
      const response = await axios({method:'POST',url:'/api/admin/txn/deleteTxn',data});
      if (response.status == 0) {
        dispatch(COMPONENT_LOADER_DELETE_TXN(null));
        return response.result; 
      } else {
        dispatch(COMPONENT_LOADER_DELETE_TXN(null));
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const searchSoaSlice = createSlice({
  name: 'searchSoa',
  initialState,
  reducers: {
    setLoader: (state,action) => {
      state.loaderSearchFolio = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchFolioIdData.pending, (state) => {
        state.searchFolioNumData.apiStatus = 1
      })
      .addCase(getSearchFolioIdData.fulfilled, (state, action) => {
        state.searchFolioNumData = { data: action.payload, apiStatus: 0 }
      })
      .addCase(getSearchFolioIdData.rejected, (state, action) => {
        state.searchFolioNumData = { errorMsg: action.payload, apiStatus: -1};
        state.loaderSearchFolio = false;
      })
      .addCase(getSearchSoaData.pending, (state) => {
        state.searchFolioIdData.apiStatus = 1
      })
      .addCase(getSearchSoaData.fulfilled, (state, action) => {
        state.searchFolioIdData = { data: action.payload, apiStatus: 0 }
      })
      .addCase(getSearchSoaData.rejected, (state, action) => {
        state.searchFolioIdData = { errorMsg: action.payload, apiStatus: -1};
        state.loaderSearchFolio = false;
      })

      .addCase(unFreezeFolios.pending, (state) => {
        state.notification = action.payload
      })
      .addCase(unFreezeFolios.fulfilled, (state, action) => {
        state.notification = action.payload
        state.errorMsg= false
      })
      .addCase(unFreezeFolios.rejected, (state, action) => {
        state.notification = action.payload
        state.errorMsg= true
      })

      .addCase(TouchFolios.pending, (state) => {
        state.notification = action.payload
      })
      .addCase(TouchFolios.fulfilled, (state, action) => {
        state.notification = action.payload
        state.errorMsg= false
      })
      .addCase(TouchFolios.rejected, (state, action) => {
        state.notification = action.payload
        state.errorMsg= true
      })

      .addCase(freezeFolios.pending, (state) => {
        state.notification = action.payload
      })
      .addCase(freezeFolios.fulfilled, (state, action) => {
        state.notification = action.payload
        state.errorMsg= false
      })
      .addCase(freezeFolios.rejected, (state, action) => {
        state.notification = action.payload
        state.errorMsg= true
      })

      .addCase(deleteReversals.pending, (state) => {
        state.notification = action.payload
      })
      .addCase(deleteReversals.fulfilled, (state, action) => {
        state.notification = action.payload
        state.errorMsg= false
      })
      .addCase(deleteReversals.rejected, (state, action) => {
        state.notification = action.payload
        state.errorMsg= true
      })

      .addCase(deleteTxn.pending, (state) => {
        state.deletingTxn = true
        state.deletedTxn = false
      })
      .addCase(deleteTxn.fulfilled, (state, action) => {
        state.deletingTxn = false
        state.deletedTxn = true
        state.notificationStatus = action.payload
        state.notification = action.payload
      })
      .addCase(deleteTxn.rejected, (state, action) => {
        state.deletingTxn = false
        state.failedDeletingTxn = true
        state.errorMsg = action.payload
        state.notification = action.payload 
      })
  }
});

// Export reducer
export default searchSoaSlice.reducer;
