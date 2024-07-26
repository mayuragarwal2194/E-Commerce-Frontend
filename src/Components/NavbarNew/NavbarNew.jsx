import React, { useState, useEffect, useContext } from 'react';
import './NavbarNew.css';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const NavbarNew = () => {
  const [menu, setMenu] = useState('shop');
  const [categories, setCategories] = useState([]);
  const { getTotalCartItems } = useContext(ShopContext);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/parentcategories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const [isSticky, setIsSticky] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/' && window.scrollY > 60) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Attach scroll event listener only if on the home page
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsReveal(true); // Add reveal class on other pages
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <div className={`navbar-section inside-banner ${isSticky && location.pathname === '/' ? 'sticky' : ''} ${isReveal && location.pathname !== '/' ? 'reveal' : ''}`}>
      <div className="px-lg-5">
        <nav className='navbarnew d-flex align-items-center justify-content-between p-0'>
          <ul className="desktop-menu letter-216 d-flex align-items-center list-unstyled mb-0 flex-1">
            {categories
              .filter(({ showInNavbar, isActive }) => showInNavbar && isActive)
              .map(({ _id, name }) => {
                const lowerCaseName = name.toLowerCase();
                return (
                  <li
                    key={_id}
                    onClick={() => setMenu(lowerCaseName)}
                    className={`nav-item cursor-pointer position-relative ${menu === lowerCaseName ? 'active' : ''}`}
                  >
                    <Link className="text-decoration-none text-capitalize" to={`/${lowerCaseName}`}>
                      <span>{name}</span>
                    </Link>
                  </li>
                );
              })}

            <li className="nav-item cursor-pointer position-relative">
              <span className="position-relative">Shop</span>
            </li>
            <li className="nav-item cursor-pointer position-relative">
              <span className="position-relative">About</span>
            </li>
            <li className="nav-item cursor-pointer position-relative">
              <span className="position-relative">Blog</span>
            </li>
          </ul>
          <div className="store-logo-wrapper">
            <Link to='/' aria-label="Visit FashionFusion Homepage" className="store-logo d-block">
              <img src="/images/logo.png" className="w-100 h-100" alt="Logo" />
            </Link>
          </div>
          <div className="navbar-right d-flex align-items-center justify-content-end flex-1">
            <div className="dropdown dropdown-hover desktop-dropdown position-relative">
              <button className="dropbtn border-0 bg-transparent">
                Country
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <div className="dropdown-content ps-3 py-3">
                <div className='d-flex flex-column gap-2'>
                  <a href="#service1">
                    <div className="nav-currency d-flex align-items-center gap-2">
                      <img src="./Icons/us.svg" alt="" />
                      <div className="nav-item">USD $</div>
                    </div>
                  </a>
                  <a href="#service2">Service 2</a>
                  <a href="#service3">Service 3</a>
                </div>
              </div>
            </div>
            <ul className="nav-icons d-flex align-items-center justify-content-between list-unstyled mb-0">
              <li className="user-login">
                <Link className="text-decoration-none" to="/login">
                  <i className="ri-user-3-line"></i>
                </Link>
              </li>
              <li className="search desktop-search">
                <i className="ri-search-line"></i>
              </li>
              <li className="cart">
                <Link className="text-decoration-none" to="/cart">
                  <i className="ri-shopping-bag-line"></i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarNew;