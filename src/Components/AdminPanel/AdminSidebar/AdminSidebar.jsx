import React from 'react';

const AdminSidebar = ({ activeTab, handleTabChange, productId }) => {
  return (
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
  );
};

export default AdminSidebar;