import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = ({ fetchProducts }) => {
  const [product, setProduct] = useState({
    id: '',
    itemName: '',
    new_price: '',
    old_price: '',
    category: '', // Changed from input to select
    isPopular: false,
  });
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState('addProduct');
  const navigate = useNavigate();
  const { productId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
      setActiveTab('editProduct');
    }
    fetchCategories(); // Fetch categories when component mounts
  }, [productId]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/categories');
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
      category: '', // Reset category to empty string
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
        response = await fetch(`http://localhost:5000/products/${product._id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost:5000/products', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        resetForm();
        fetchProducts();
        navigate('/admin');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
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
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="px-3 py-1 me-3"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
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
        <div>
          <button
            type="submit"
            className="btn_fill_red text-white px-4 py-2 rounded-pill cursor-pointer fw-500"
          >
            {activeTab === 'editProduct' ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;