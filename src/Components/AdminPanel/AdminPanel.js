import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminPanel.css';
import AddCategory from './Categories/AddCategory'; // Import your AddCategory component
import ViewCategories from './Categories/ViewCategories'; // Import your ViewCategories component

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    id: '',
    itemName: '',
    new_price: '',
    old_price: '',
    category: '',
    isPopular: false,
  });
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState('addProduct');
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    fetchProducts();
    if (productId) {
      fetchProductDetails(productId);
      setActiveTab('editProduct');
    }
  }, [productId]);

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

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        console.error('Failed to fetch product details');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/categories'); // Adjust URL based on your API
      if (response.ok) {
        const data = await response.json();
        // Handle fetched categories, update state, etc.
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const resetForm = () => {
    setProduct({
      id: '',
      itemName: '',
      new_price: '',
      old_price: '',
      category: '',
      isPopular: false,
    });
    setImage(null);
    const fileInput = document.getElementById('productImage');
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('itemName', product.itemName);
    formData.append('new_price', product.new_price);
    formData.append('old_price', product.old_price);
    formData.append('category', product.category);
    formData.append('isPopular', product.isPopular);
    if (image) {
      formData.append('image', image);
    }

    try {
      let response;
      if (activeTab === 'editProduct') {
        // Update existing product
        response = await fetch(`http://localhost:5000/products/${product._id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Add new product
        response = await fetch('http://localhost:5000/products', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        resetForm(); // Clear the form fields after successful submission
        fetchProducts(); // Refresh the product list
        navigate('/admin'); // Redirect to admin panel after updating or adding
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'addProduct') {
      resetForm();
    }
    navigate('/admin');
  };

  const handleEdit = (prod) => {
    navigate(`/admin/edit/${prod._id}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchProducts(); // Refresh the product list after deletion
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="container-fluid my-5 adminpanel">
      <h1 className="text-center mb-5">Admin Panel</h1>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group mb-3">
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'addProduct' ? 'active' : ''}`}
              onClick={() => handleTabChange('addProduct')}
            >
              Add Product
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'viewProducts' ? 'active' : ''}`}
              onClick={() => handleTabChange('viewProducts')}
            >
              View Products
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'editProduct' ? 'active' : ''}`}
              onClick={() => handleTabChange('editProduct')}
              disabled={!productId}
            >
              Edit Product
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'addCategories' ? 'active' : ''}`}
              onClick={() => handleTabChange('addCategories')}
            >
              Add Categories
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'viewCategories' ? 'active' : ''}`}
              onClick={() => handleTabChange('viewCategories')}
            >
              View Categories
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="col-md-9">
          {(activeTab === 'addProduct' || activeTab === 'editProduct') && (
            <div className="w-100">
              <h2 className="mb-4">{activeTab === 'addProduct' ? 'Add Product' : 'Edit Product'}</h2>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                <div className="">
                  <input
                    name="id"
                    value={product.id}
                    onChange={handleChange}
                    className="px-3 py-1 me-3"
                    placeholder="ID"
                  />
                  <input
                    name="itemName"
                    value={product.itemName}
                    onChange={handleChange}
                    className="px-3 py-1 me-3"
                    placeholder="Item Name"
                  />
                </div>
                <div>
                  <input
                    name="new_price"
                    value={product.new_price}
                    onChange={handleChange}
                    className="px-3 py-1 me-3"
                    placeholder="New Price"
                  />
                  <input
                    name="old_price"
                    value={product.old_price}
                    onChange={handleChange}
                    className="px-3 py-1 me-3"
                    placeholder="Old Price"
                  />
                </div>
                <div>
                  <input
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="px-3 py-1 me-3"
                    placeholder="Category"
                  />
                  <input type="file" id="productImage" onChange={handleImageChange} className="" />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isPopular"
                    name="isPopular"
                    checked={product.isPopular}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isPopular">
                    Popular Product
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-pill text-white w-fit-content py-2 px-4 fw-500 mt-3 cursor-pointer add-product-btn"
                >
                  {activeTab === 'editProduct' ? 'Update Product' : 'Add Product'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'viewProducts' && (
            <div className="w-            100">
              <h2 className="mb-4">View Products</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item Name</th>
                      <th>New Price</th>
                      <th>Old Price</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => (
                      <tr key={prod._id}>
                        <td>{prod.id}</td>
                        <td>{prod.itemName}</td>
                        <td>${prod.new_price}</td>
                        <td>${prod.old_price}</td>
                        <td>{prod.category}</td>
                        <td>
                          <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(prod)}>
                            Edit
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(prod._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'addCategories' && (
            <AddCategory fetchCategories={fetchCategories} /> // Pass fetchCategories function as prop
          )}

          {activeTab === 'viewCategories' && (
            <ViewCategories /> // Render ViewCategories component
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
