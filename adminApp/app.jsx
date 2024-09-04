import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Admin = () => <div>Admin </div>;
const About = () => <div>About</div>;
const Home = () => <div>Home Page</div>;
const SideBar = () => <div>SideBar Page     <Router>
  <Routes>
    <Route path="/adminApp/about" element={<About />} />
    <Route path="/adminApp/home" element={<Home />} />
    <Route path="/app" element={<Admin />} />
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
