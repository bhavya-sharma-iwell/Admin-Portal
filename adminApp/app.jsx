import React, { Fragment } from 'react';
import Cookie from './utils/Cookie';
import AuthenticateUser from './utils/Auth'
import SetPageTitle from './utils/setPageTitle'
import Admin from './features';

const App = (props) => {

  return (
    <Fragment>
      <Admin />
      {Cookie.getCookie('c_ux') && <AuthenticateUser onChange={p => SetPageTitle(p)}>
        <Admin />
      </AuthenticateUser>}
    </Fragment>
  );
};
export default App;