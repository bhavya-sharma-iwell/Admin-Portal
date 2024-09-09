import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaderAumDelFolioTxn:null,
  loaderSearchFolio:null,
  loaderDeleteTxn:null
};

const commonLoaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS: (state, action) => {
      state.loaderAumDelFolioTxn = action.payload
    },
    COMPONENT_LOADER_FOLIO_ID_DATA: (state, action) => {
      state.lastApiCallTime = action.payload
    },
    COMPONENT_LOADER_DELETE_TXN: (state, action) => {
        state.loaderDeleteTxn = action.payload
    } 
  },
});

export const {
    COMPONENT_LOADER_AUM_DELETE_FOLIO_TXNS,
    COMPONENT_LOADER_FOLIO_ID_DATA,
    COMPONENT_LOADER_DELETE_TXN
} = commonLoaderSlice.actions;

export default commonLoaderSlice.reducer;