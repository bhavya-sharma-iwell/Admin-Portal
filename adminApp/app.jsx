import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Admin = () => <div>Admin </div>;
const About = () => <div>About PAGE</div>;
const Home = () => <div>Home Page</div>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/adminApp/about" element={<About />} />
        <Route path="/adminApp/home" element={<Home />} />
        <Route path="/app" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
