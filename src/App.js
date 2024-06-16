import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import AdminPanel from './Components/AdminPanel/AdminPanel';

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
  const shouldRenderNavbarAndFooter = !location.pathname.startsWith('/admin');

  return (
    <>
      {shouldRenderNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory category="men" />} />
        <Route path='/womens' element={<ShopCategory category="women" />} />
        <Route path='/kids' element={<ShopCategory category="kid" />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/admin/*' element={<AdminPanel />} /> {/* Route for Admin panel */}
        <Route path="/admin/edit/:productId" element={<AdminPanel />} />
      </Routes>
      {shouldRenderNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;