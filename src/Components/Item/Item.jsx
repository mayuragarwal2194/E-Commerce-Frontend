import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = ({ image, itemName, new_price, old_price, id }) => {
  return (
    <div className="col item">
      <Link to={`/product/${id}`} className='text-decoration-none'>
        <div className="card border-0">
          <img src={`http://localhost:5000${image}`} alt={itemName} className='item-image w-100' />
          <div className="card-body px-0">
            <h5 className="item-name fw-500">{itemName}</h5>
            <div className="item-prices d-flex align-items-center gap-3">
              <div className="item-price-new fw-600">
                ${new_price}
              </div>
              <div className="item-price-old text-decoration-line-through fw-500">
                ${old_price}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Item