import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import './BestProducts.css';
import ItemNew from '../ItemNew/ItemNew';
// import Item from '../Item/Item';

const BestProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('women'); // Default active tab is 'women'

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const products = await response.json();
        const popularItems = products.filter(product => product.isPopular);
        setPopularProducts(popularItems);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="best-section section-padding text-center bg-orange">
      <div className="section-header">
        <h6 className="section-subhead">Our best sellers</h6>
      </div>
      <div className="section-body">
        <div className="container">
          <div className="best-tabs d-flex align-items-center justify-content-center letter-5">
            <h3
              className={`best-tab fw-normal cursor-pointer text-uppercase ${activeTab === 'women' ? 'active' : ''}`}
              onClick={() => handleTabClick('women')}
            >
              Women
            </h3>
            <h3
              className={`best-tab fw-normal cursor-pointer text-uppercase ${activeTab === 'men' ? 'active' : ''}`}
              onClick={() => handleTabClick('men')}
            >
              Men
            </h3>
          </div>
          <div className="slider-container responsive" id='best-sliderContainer'>
            <Slider {...settings}>
              {popularProducts
                .filter(item => item.category === (activeTab === 'women' ? 'womens' : 'mens'))
                .map((item, i) => (
                  <ItemNew
                    key={i}
                    id={item.id}
                    image={item.image}
                    itemName={item.itemName}
                    new_price={item.new_price}
                    old_price={item.old_price}
                  />
                ))
              }
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestProducts;