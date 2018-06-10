import React from 'react';

import '../styles/product_cards.css';

const ProductCard = ({ item, addToCart }) => (
  <div className="col-sm-6 col-md-4 col-lg-3">
    <div className="card product-card">
      <img className="card-img-top"
           src={require('../images/' + item.itemId + '.jpg')}
           alt={item.name} />

      <div className="card-body">
        <h4 className="card-title">{item.name}</h4>
        <p>${(item.price * 0.01).toFixed(2)}</p>
        <p>{item.inStock === true ? 'In Stock' : 'Out of Stock'}</p>
        <button
          className="btn btn-lg btn-primary add-to-cart"
          data-id={item.itemId}
          onClick={addToCart} >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
