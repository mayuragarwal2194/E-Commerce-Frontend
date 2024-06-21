// AdminPanel.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './AdminPanel.css';
import AddCategory from './Categories/AddCategory';
import ViewCategories from './Categories/ViewCategories';
import ProductForm from './ProductForm/ProductForm';
import ViewProducts from './ViewProduct/ViewProduct';
import AdminSidebar from './AdminSidebar/AdminSidebar';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('addProduct');
  const navigate = useNavigate();
  const { productId, categoryId } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    if (productId) {
      setActiveTab('editProduct');
    } else if (categoryId) {
      setActiveTab('editCategory');
    }
  }, [productId, categoryId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/categories');
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'addProduct') {
      navigate('/admin');
    } else if (tab === 'addCategories') {
      navigate('/admin/categories/add');
    } else if (tab === 'viewCategories') {
      navigate('/admin/categories');
    } else if (tab === 'viewProducts') {
      navigate('/admin/products');
    }
  };

  return (
    <div className="container-fluid my-5 adminpanel">
      <h1 className="text-center mb-5">Admin Panel</h1>
      <div className="row">
        <div className="col-md-3">
          <AdminSidebar
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            productId={productId}
            categoryId={categoryId}
          />
        </div>
        <div className="col-md-9">
          {activeTab === 'addProduct' && (
            <ProductForm fetchProducts={fetchProducts} />
          )}
          {activeTab === 'editProduct' && (
            <ProductForm fetchProducts={fetchProducts} />
          )}
          {activeTab === 'viewProducts' && (
            <ViewProducts products={products} fetchProducts={fetchProducts} categories={categories} />
          )}
          {activeTab === 'addCategories' && (
            <AddCategory fetchCategories={fetchCategories} />
          )}
          {activeTab === 'editCategory' && (
            <AddCategory fetchCategories={fetchCategories} categoryToEdit={location.state?.category} />
          )}
          {activeTab === 'viewCategories' && (
            <ViewCategories
              categories={categories}
              fetchCategories={fetchCategories}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
