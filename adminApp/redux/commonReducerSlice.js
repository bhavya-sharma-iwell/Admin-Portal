// features/commonReducerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onGoingApiCallCount: 0,
  lastApiCallTime: null,
  refreshKey: null,
  checkForMaintainance: false,
  recaptchaToken: null,
  addViewActionType:null
};

const commonReducerSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    UPDATE_LOADER: (state, action) => {
      state.pageProgress = action.payload;
    },
    LAST_API_CALL_TIME: (state, action) => {
      state.lastApiCallTime = action.payload;
    },
    ADD_REFRESH_KEY: (state, action) => {
      state.refreshKey = action.payload;
    },
    CHECK_FOR_MAINTAINANCE: (state, action) => {
      state.checkForMaintainance = action.payload;
    },
    SAVE_RECAPTCHA_TOKEN: (state, action) => {
      state.recaptchaToken = action.payload;
    },
    ADD_VIEW_ACTION: (state, action) => {
        state.addViewActionType = action.payload;
    },
  },
});

export const {
  UPDATE_LOADER,
  LAST_API_CALL_TIME,
  ADD_REFRESH_KEY,
  CHECK_FOR_MAINTAINANCE,
  SAVE_RECAPTCHA_TOKEN,
  ADD_VIEW_ACTION
} = commonReducerSlice.actions;

export default commonReducerSlice.reducer;