// Navbar.js

import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const [categories, setCategories] = useState([]);
  const { getTotalCartItems } = useContext(ShopContext);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/categories/viewcategory');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <nav className="navbar w-100">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100 p-2">
          <Link className="text-decoration-none" to="/">
            <div className="nav-logo d-flex align-items-center gap-2">
              <img src={logo} alt="" />
              <p className="mb-0">SHOPPER</p>
            </div>
          </Link>
          <ul className="nav-menu list-unstyled d-flex align-items-center gap-4 mb-0 underline-hover-effect">
            <li onClick={() => setMenu('shop')} className={`cursor-pointer ${menu === 'shop' && 'active'}`}>
              <Link className="text-decoration-none" to="/">
                Shop
              </Link>
            </li>
            {categories
              .filter((category) => category.showInNavbar)
              .map((category) => (
                <li
                  key={category._id}
                  onClick={() => setMenu(category.name.toLowerCase())}
                  className={`cursor-pointer ${menu === category.name.toLowerCase() && 'active'}`}
                >
                  <Link className="text-decoration-none" to={`/${category.name.toLowerCase()}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="nav-login-cart d-flex align-items-center gap-4">
            <Link className="text-decoration-none" to="/login">
              <button className="px-4 py-2 rounded-pill bg-transparent fw-500">Login</button>
            </Link>
            <div className="cart position-relative">
              <Link className="text-decoration-none" to="/cart">
                <img src={cart_icon} alt="" width="28px" className="cursor-pointer" />
              </Link>
              <div className="nav-cart-counter d-flex align-items-center justify-content-center text-white rounded-circle position-absolute">
                {getTotalCartItems()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;