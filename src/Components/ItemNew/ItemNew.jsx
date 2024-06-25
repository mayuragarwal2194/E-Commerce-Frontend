import React from 'react'
import { Link } from 'react-router-dom'
import './ItemNew.css'

const ItemNew = ({ image, itemName, new_price, old_price, id }) => {
  return (
    <div className="itemnew">
      <Link to={`/product/${id}`} className='mega-card text-decoration-none'>
        <div className="card-image w-100 position-relative">
          <img src={`http://localhost:5000${image}`} alt={itemName} className="w-100 h-auto" />
          <div className={`best-seller-tag text-uppercase position-absolute`}> New </div>
        </div>
        <div className="card-body text-center mt-3 letter-216">
          <h6 className="product-title">{itemName}</h6>
          <div className="product-price">
            <div className="item-price-new fw-600">
              ${new_price}
            </div>
            <div className="item-price-old text-decoration-line-through fw-500">
              ${old_price}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ItemNew