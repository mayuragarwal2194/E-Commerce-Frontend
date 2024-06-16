import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = ({ banner, category }) => {
  const { allProducts } = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <div className="container">
        <img src={banner} className="w-100 h-auto my-4 d-block" alt="" />
        <div className="shopcategory-indexsort my-4 d-flex align-items-center justify-content-between">
          <p className='mb-0'>
            <span className='fw-600'>Showing 1-12</span> Out of 36 products
          </p>
          <div className="shopcategory-sort rounded-pill px-4 py-2">
            Sort By <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {allProducts.map((item, i) => {
              if (category === item.category) {
                return (
                  <Item
                    key={i}
                    id={item.id}
                    image={item.image}
                    itemName={item.itemName}
                    new_price={item.new_price}
                    old_price={item.old_price}
                  />
                );
              } else {
                return null;
              }
            })}
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