import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './user'

const Admin = () => <div>Admin </div>;
const About = () => <div>About</div>;
const Home = () => <div>Home Page</div>;
const SideBar = () => <div>SideBar Page     <Router>
  <Routes>
    <Route path="/adminApp/about" element={<User />} />
    <Route path="/" element={<Home />} />
  </Routes>
</Router>
</div>;

const App = () => {
  return (
    <>
      <SideBar />

    </>
  );
};

export default App;
