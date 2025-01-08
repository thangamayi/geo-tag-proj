import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import Footer from './components/Footer/Footer'
import NavBar from './components/navbar/NavBar';
import Contact from '../src/pages/Contact/Contact';
import Layout from './pages/Layout/Layout';
import Admin from './Admin/Admin';
const App = () => {
  // Navbar with About page combined
  const NavbarWithImage = () => (
    <>
      <NavBar/>
      <Home/>
      <Footer/>
    </>
  );

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<NavbarWithImage />} />
          <Route path="/Home" element={<NavbarWithImage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/layout" element={<Layout />} />
          <Route path='/Admin' element={ <Admin/>} />
        </Routes>
       
      </Router>
    </div>
  );
};

export default App;
