// App.js

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
import Announcement from './Components/Announcement/Announcement';
import NavbarNew from './Components/NavbarNew/NavbarNew';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FooterNew from './Components/FooterNew/FooterNew';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  // Determine if Navbar and Footer should be rendered based on the current route
  const shouldRenderComponent = !location.pathname.startsWith('/admin');

  return (
    <>
      {shouldRenderComponent && <Announcement />}
      {shouldRenderComponent && <NavbarNew />}
      {/* {shouldRenderComponent && <Navbar />} */}
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory category="mens" banner={men_banner}  />} />
        <Route path='/womens' element={<ShopCategory category="womens" banner={women_banner} />} />
        <Route path='/kids' element={<ShopCategory category="kids" banner={kids_banner} />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/admin/*' element={<AdminPanel />} /> {/* Route for Admin panel */}
        <Route path="/admin/edit/:productId" element={<AdminPanel />} />
        <Route path="/admin/categories/edit/:categoryId" element={<AdminPanel />} /> {/* Route for editing categories */}
      </Routes>
      {/* {shouldRenderComponent && <Footer />} */}
      {shouldRenderComponent && <FooterNew />}
    </>
  );
}

export default App;