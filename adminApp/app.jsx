import React, { Fragment } from 'react';
import Cookie from './utils/Cookie';
import AuthenticateUser from './utils/Auth'
import SetPageTitle from './utils/setPageTitle'
import Admin from './features';
import {connect} from 'react-redux'
import AdminInfoRoutes from './routes';

const App = (props) => {
  console.log('*****************111111111111*')

  return (
    <Fragment>
    <AdminInfoRoutes />
      {/* <Admin />
      {Cookie.getCookie('c_ux') && <AuthenticateUser onChange={p => SetPageTitle(p)}>
        <Admin />
      </AuthenticateUser>} */}
    </Fragment>
  );
};
export default App;