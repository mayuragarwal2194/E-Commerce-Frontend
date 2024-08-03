import React, { useState, useEffect, useContext } from 'react';
import './NavbarNew.css';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { fetchTopCategories } from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavbarNew = () => {
  const [menu, setMenu] = useState('shop');
  const [categories, setCategories] = useState([]);
  const { getTotalCartItems } = useContext(ShopContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await fetchTopCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories. Please try again later.');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/' && window.scrollY > 60) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsReveal(true);
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

            <li className="nav-item cursor-pointer dropbtn dropdown-hover border-0">
              <span className="position-relative">Women</span>
              <div className="dropdown-content mega-menu w-100 px-lg-5">
                <div className="container-fluid px-lg-48">
                  <div className="row">
                    <div className="col-2">
                      <div className="mega-navs pe-2 h-100">
                        <a href="#arrival" className="mega-nav nav-currency d-flex align-items-center gap-2 px-0 text-uppercase active">
                          New Arrival
                        </a>
                        <a href="#arrival" className="mega-nav px-0 text-uppercase">
                          popular
                        </a>
                        <a href="#arrival" className="mega-nav px-0 text-uppercase">
                          hot this week
                        </a>
                        <a href="#arrival" className="mega-nav px-0 text-uppercase">
                          casuals
                        </a>
                        <a href="#arrival" className="mega-nav px-0 text-uppercase">
                          formals
                        </a>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="row row-cols-1 row-cols-md-3 g-4 mega-row">
                        <div className="col">
                          <a href="#arrival" className="mega-card">
                            <div>
                              <div className="card-image w-100 position-relative">
                                <img
                                  src="./images/suits.webp"
                                  className="w-100 h-100 object-cover"
                                  alt="Product Image"
                                />
                                <div className="best-seller-tag text-uppercase position-absolute">
                                  Best Seller
                                </div>
                              </div>
                              <div className="card-body text-center mt-3 letter-216">
                                <h6 className="product-title">
                                  Le Dalia Ivory Liégé
                                </h6>
                                <div className="product-price">$ 380</div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col">
                          <a href="#arrival" className="mega-card">
                            <div>
                              <div className="card-image w-100">
                                <img
                                  src="./images/suits.webp"
                                  className="w-100 h-100 object-cover"
                                  alt="Product Image"
                                />
                              </div>
                              <div className="card-body text-center mt-3 letter-216">
                                <h6 className="product-title">
                                  Le Dalia Ivory Liégé
                                </h6>
                                <div className="product-price">$ 380</div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col">
                          <a href="#arrival" className="mega-card">
                            <div>
                              <div className="card-image w-100 position-relative">
                                <img
                                  src="./images/suits.webp"
                                  className="w-100 h-100 object-cover"
                                  alt="Product Image"
                                />
                                <div className="best-seller-tag text-uppercase position-absolute">
                                  Best Seller
                                </div>
                              </div>
                              <div className="card-body text-center mt-3 letter-216">
                                <h6 className="product-title">
                                  Le Dalia Ivory Liégé
                                </h6>
                                <div className="product-price">$ 380</div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <a href="#arrival" className="h-100 mega-card">
                        <div className="mega-card-collection h-100">
                          <div className="card-image w-100">
                            <div className="img-overlay w-100 h-100 d-flex align-items-end p-3">
                              <div className="collection-name text-white text-uppercase d-flex align-items-center">
                                <div>Checkout all new arrivals</div>
                                <svg className="flex-shrink-0" width="32" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_139_1069)">
                                    <path d="M-10 14H25.1717L18.5858 20.5859C17.8047 21.3668 17.8047 22.6332 18.5858 23.4143C18.9763 23.8047 19.4882 24 20 24C20.5119 24 21.0238 23.8047 21.4142 23.4141L31.4142 13.4141C32.1953 12.6332 32.1953 11.3668 31.4142 10.5857L21.4142 0.585701C20.6333 -0.195234 19.3668 -0.195234 18.5858 0.585701C17.8047 1.36664 17.8047 2.63304 18.5858 3.41411L25.1717 9.99998H-10C-11.1045 9.99998 -12 10.8954 -12 12C-12 13.1045 -11.1045 14 -10 14Z" fill="white" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_139_1069">
                                      <rect width="44" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

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
      <ToastContainer />
    </div>
  );
}

export default NavbarNew;