import React, { useState, useEffect } from 'react';

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);

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
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="view-categories">
      <h2>View Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            <strong>{cat.name}</strong>
            {cat.parentCategory && <span> (Parent: {cat.parentCategory})</span>}
            <br />
            Active: {cat.active ? 'Yes' : 'No'}, Show in Navbar: {cat.showInNavbar ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCategories;