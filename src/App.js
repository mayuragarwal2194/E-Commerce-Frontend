import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
// import AdminPanel from '../../admin/AdminPanel';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
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
  const shouldRenderComponent = !location.pathname.startsWith('/admin');

  return (
    <>
      {shouldRenderComponent && <Announcement />}
      {shouldRenderComponent && <NavbarNew />}
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory category="mens" banner={men_banner} />} />
        <Route path='/womens' element={<ShopCategory category="womens" banner={women_banner} />} />
        <Route path='/kids' element={<ShopCategory category="kids" banner={kids_banner} />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        {/* Route for Admin panel */}
        {/* <Route path='/admin/*' element={<AdminPanel />} /> 
        <Route path="/admin/edit/:productId" element={<AdminPanel />} /> */}
        {/* Route for editing categories */}
        {/* <Route path="/admin/categories/edit/:categoryId" element={<AdminPanel />} />  */}
      </Routes>
      {shouldRenderComponent && <FooterNew />}
    </>
  );
}

export default App;