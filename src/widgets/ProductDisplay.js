import React from 'react';
import ProductCard from './ProductCard';

const ProductDisplay = (props) => {
  const sectionStyle = {
    margin: '1rem 0 3rem'
  }

  const items = props.items;

  if (typeof(items === 'array')) {
    return (
      <div id="product_cards_component" style={sectionStyle}>
        <div className="row">
          {items.map((item, index) =>
            <ProductCard
              key={item.itemId}
              item={item}
              addToCart={props.addToCart}
            />
          )}
        </div>
      </div>
    )
  }
}

export default ProductDisplay;
