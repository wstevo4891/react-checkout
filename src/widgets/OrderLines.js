import React from 'react';

import '../styles/order-lines.css';

const OrderLines = (props) => {
  const marginAuto = {
    margin: 'auto'
  }

  const qtyButton = {
    width: '26px',
    float: 'right'
  }

  if (props.data.length > 0) {
    return (
      <div id="orderLines">
        <div className="row" style={marginAuto}>
          <div className="col-sm-4">Item</div>
          <div className="col-sm-4">Description</div>
          <div className="col-sm-2">Qty</div>
          <div className="col-sm-2 text-center">Price</div>
        </div>

        <div className="row">
          <div className="col-12">
            {
              props.data.map((item) =>
                <div key={item.itemId} className='row order-line'>
                  <div className="col-sm-4">
                    <a href="#" className='part-link'>{item.name}</a>
                  </div>

                  <div className="col-sm-4">{item.description}</div>

                  <div className="col-sm-2 order-line-qty">
                    <span className="qty-value">{item.qtyOrdered}</span>

                    <button type="button"
                            style={qtyButton}
                            data-id={item.itemId}
                            onClick={props.removeFromCart}>-</button>

                    <button type="button"
                            style={qtyButton}
                            data-id={item.itemId}
                            onClick={props.addToCart}>+</button>
                  </div>

                  <div className="col-sm-2 text-right">
                    ${props.renderPrice(item)}
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='row cart-empty'>
        <h2>Your Cart is Empty</h2>
      </div>
    )
  }
};

export default OrderLines;
