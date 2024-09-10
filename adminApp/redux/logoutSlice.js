import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  logoutStatus: null,
  loaderLogout: null,
};

export const loggedOutUser = createAsyncThunk(
  'logout/loggedOutUser',
  async ({customUrls = null, allowSSOLogin = false } = {},
     { rejectWithValue,dispatch }) => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('authorizationToken');

      if (token) {
        SessionData.setItem('authorizationToken', token);
      } else {
        sessionStorage.removeItem('authorizationToken');
      }
      sessionStorage.removeItem('getActualTime');
      // dispatch(COMPONENT_LOADER_LOGOUT(params.componentForLoader));
      const response = await axios({method:'GET',url:'/api/auth/logout'});
      if (response.status === 0) {
        // dispatch(COMPONENT_LOADER_LOGOUT(null));
        localStorage.removeItem('isPopupOpen');
        dispatch({type:'CLEAR_STORE'})

        if (customUrls && allowSSOLogin) {
          window.open(`http://${customUrls}`, '_self');
        } else {
          window.location.href = '/loginApp';
        }

        sessionStorage.clear();
        return response.message;
      } else {
        // dispatch(COMPONENT_LOADER_LOGOUT(null));
        return rejectWithValue(response.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    COMPONENT_LOADER_LOGOUT: (state, action) => {
      state,loaderLogout = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loggedOutUser.pending, (state) => {
        state.loaderLogout = { componentName: 'logout' };
        state.logoutStatus = null
      })
      .addCase(loggedOutUser.fulfilled, (state, action) => {
        state.loaderLogout = null;
        state.logoutStatus = action.payload;
      })
      .addCase(loggedOutUser.rejected, (state, action) => {
        state.loaderLogout = null;
        state.logoutStatus = action.payload;
      });
  }
});

export const {
  COMPONENT_LOADER_LOGOUT
} = logoutSlice.actions;

export default logoutSlice.reducer;
