import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/ShopCategory.css';
import { getProductsByCategory,fetchParentCategories } from '../services/api'; // Ensure this matches your API service
import Item from '../Components/Item/Item';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';

const ShopCategory = () => {
  const { categoryId } = useParams(); // This is the category name from URL
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banner, setBanner] = useState(''); // Set this if you have dynamic banners

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Fetch all categories
        const categoryData = await fetchParentCategories();
        setCategories(categoryData);

        // Find the category ID based on the category name from the URL
        const category = categoryData.find(cat => cat.name === categoryId);
        if (category) {
          // Fetch products by category ID
          const products = await getProductsByCategory(category._id);
          setProducts(products);
        } else {
          console.error('Category not found');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  return (
    <div className='shop-category'>
      <div className="container">
        {banner && <img src={banner} className="w-100 h-auto my-4 d-block" alt="Category Banner" />}
        <div className="shopcategory-indexsort my-4 d-flex align-items-center justify-content-between">
          <p className='mb-0'>
            <span className='fw-600'>Showing 1-{products.length}</span> Out of {products.length} products
          </p>
          <div className="shopcategory-sort rounded-pill px-4 py-2">
            Sort By <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {products.length > 0 ? (
              products.map((item) => (
                <Item
                  key={item._id}
                  id={item._id}
                  image={item.featuredImage}
                  itemName={item.itemName}
                  newPrice={item.newPrice}
                  oldPrice={item.oldPrice}
                />
              ))
            ) : (
              <p>No products found for this category.</p>
            )}
          </div>
        </div>
        <div className='shopcategory-loadmore text-center my-5 pb-5'>
          <button className='rounded-pill fw-500 px-5 py-3'>Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;