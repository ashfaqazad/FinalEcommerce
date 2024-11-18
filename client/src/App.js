import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import MyOrders from './Pages/MyOrders';
// import Checkout from './Pages/Checkout';
// import Footer from './Pages/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/myorders" element={<MyOrders />} />
         <Route path="/cart" element={<Cart />} /> 
        {/* <Route path="/checkout" element={<Checkout />} /> */}
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
