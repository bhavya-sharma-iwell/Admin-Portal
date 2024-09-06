// In a component
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './redux/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loginFail = useSelector((state) => state.user.loginFail);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  if (loginFail) {
    return <div>Error: {user.errorMsg}</div>;
  }

  return (
    <div>
      {loggedIn ? (
        <div>Welcome, {user.name}</div> // Adjust based on your user object structure
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserProfile;
