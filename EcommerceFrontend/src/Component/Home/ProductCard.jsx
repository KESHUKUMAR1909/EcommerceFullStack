import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './Home.css'

  
const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)", // inactive stars
    activeColor: "tomato",          // filled stars
    value: product.ratings,
    isHalf: true,
    size:window.innerWidth<600?20:25
  }
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /><span> ({product.numOfReviews})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard;
