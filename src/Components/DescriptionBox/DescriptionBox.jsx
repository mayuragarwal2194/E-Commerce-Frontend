import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox my-5 py-5'>
      <ul className="descriptionbox-navigator d-flex align-items-center justify-content-center gap-3 list-unstyled mb-5">
        <li className='descriptionbox-navs px-3 active' id='nav-description'>Description</li>
        <li className='descriptionbox-navs px-3' id='nav-shiping'>Shiping Info</li>
        <li className='descriptionbox-navs px-3' id='nav-reviews'>Reviews (122)</li>
      </ul>
      <div className="descriptionbox-description w-75 m-auto">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero similique cum architecto commodi quia perferendis et nobis nam asperiores illum iusto qui, odit fuga error. Autem, accusantium repellat debitis eius laboriosam, necessitatibus quos porro sunt, in architecto molestias impedit unde! Esse quis iste voluptas reprehenderit maiores, nam quasi mollitia voluptate deleniti ut amet soluta officia veritatis repellat debitis voluptatibus voluptatem minus, porro nemo laborum. Pariatur eius, sapiente, similique nostrum delectus assumenda, in adipisci iusto quae est quasi a non. Ut aperiam asperiores consequatur deleniti ducimus, magni eaque non necessitatibus quia? Neque laborum architecto cumque voluptas eaque. Consequuntur ab voluptas iusto?
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, explicabo possimus libero voluptates aliquam et odit blanditiis molestias aliquid, vero dolorem earum minima animi porro est dolor consequuntur, maiores expedita culpa quasi sapiente deleniti! Aliquid velit distinctio id praesentium molestias consequuntur. Veniam, ducimus doloremque placeat ut autem quisquam cum id!
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox