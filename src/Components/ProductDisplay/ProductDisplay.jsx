import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import BTN_FILL_RED from '../Buttons/BtnFillRed/Btn_Fill_Red';
import BtnOutlineRed from '../Buttons/BtnOutlineRed/BtnOutlineRed';
import payment_info_img from '../Assets/payment-info.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  return (
    <div className='productdisplay my-4 d-flex align-items-start gap-5'>
      <div className="productdisplay-left d-flex align-items-start gap-3">
        <div className="productdisplay-img-list d-flex align-items-center justify-content-between flex-column gap-3">
          <img src={`http://localhost:5000${product.image}`} alt="" />
          <img src={`http://localhost:5000${product.image}`} alt="" />
          <img src={`http://localhost:5000${product.image}`} alt="" />
          <img src={`http://localhost:5000${product.image}`} alt="" />
        </div>
        <div className="productdisplay-img">
          <img src={`http://localhost:5000${product.image}`} alt="" className='productdisplay-main-img' />
        </div>
      </div>
      <div className="productdisplay-right d-flex flex-column gap-3">
        <h1 className='product-title mb-0 fw-600 '>{product.itemName}</h1>
        <p className="product-description mb-0">
          This is a static description. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure officia debitis vero consequuntur dolorum sapiente id, incidunt distinctio vitae repellat doloremque ea.
        </p>
        <div className="productdisplay-stars d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-1">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
          </div>
          <p className='mb-0'>(122 Ratings)</p>
        </div>
        <div className="product-prices d-flex align-items-center gap-4">
          <div className="current-price fw-600">${product.new_price}</div>
          <div className="old-price text-decoration-line-through">
            ${product.old_price}
          </div>
          <span className='product-discount'>(53% OFF)</span>
        </div>
        <div className="productdisplay-size">
          <h1 className='text-uppercase fw-bold'>Select Size</h1>
          <ul className="product-sizes mb-0 list-unstyled d-flex align-items-center gap-3">
            <li className='d-flex align-items-center justify-content-center cursor-pointer'>S</li>
            <li className='d-flex align-items-center justify-content-center cursor-pointer'>M</li>
            <li className='d-flex align-items-center justify-content-center cursor-pointer'>L</li>
            <li className='d-flex align-items-center justify-content-center cursor-pointer'>XL</li>
            <li className='d-flex align-items-center justify-content-center cursor-pointer'>XXL</li>
          </ul>
        </div>
        <div className='productdisplay-add-btn d-flex align-items-center gap-3'>
          <BTN_FILL_RED btn_name={`Add To cart`} onClick={handleAddToCart} />
          <BtnOutlineRed btn_name={`Wishlist`} />
        </div>
        <div className="product-buy-now-btn w-100">
          <BtnOutlineRed btn_name={`Buy Now`} />
        </div>
        <div className="payment-info">
          <div className="payment-head">GUARANTEED SAFE CHECKOUT:</div>
          <div className="payment-info-image w-50 mt-2">
            <img src={payment_info_img} alt="" className='w-100' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
