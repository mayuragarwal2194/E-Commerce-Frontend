import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const numericProductId = Number(productId);

    const foundProduct = allProducts.find((e) => e.id === numericProductId);

    setProduct(foundProduct);
  }, [allProducts, productId]);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail my-5">
      <div className='container'>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </div>
    </div>
  );
};

export default Product;
