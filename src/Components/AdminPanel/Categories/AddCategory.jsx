import React, { useState } from 'react';

const AddCategory = ({ fetchCategories }) => {
  const [category, setCategory] = useState({
    name: '',
    parentCategory: '',
    active: true,
    showInNavbar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        alert('Category added successfully!');
        fetchCategories(); // Refresh categories after adding
        setCategory({
          name: '',
          parentCategory: '',
          active: true,
          showInNavbar: false,
        });
      } else {
        throw new Error('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="add-category">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={category.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />
        <input
          type="text"
          name="parentCategory"
          value={category.parentCategory}
          onChange={handleChange}
          placeholder="Parent Category (optional)"
        />
        <label>
          Active:
          <input
            type="checkbox"
            name="active"
            checked={category.active}
            onChange={handleChange}
          />
        </label>
        <label>
          Show in Navbar:
          <input
            type="checkbox"
            name="showInNavbar"
            checked={category.showInNavbar}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;