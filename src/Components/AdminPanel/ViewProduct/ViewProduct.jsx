import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewProducts = ({ products, fetchProducts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Include fetchProducts in the dependency array

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
          fetchProducts(); // Fetch products again after successful deletion
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="w-100">
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
  );
};

export default ViewProducts;