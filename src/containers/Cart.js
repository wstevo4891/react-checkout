import React from 'react';

import OrderLines from '../widgets/OrderLines';
import { PromoCodeWidget } from '../widgets/PromoCodeWidget';
import TotalWidget from '../widgets/TotalWidget';
import ProductDisplay from '../widgets/ProductDisplay';

const Cart = (props) => {
  const renderPrice = (item) => {
    return ((item.price * 0.01) * item.qtyOrdered).toFixed(2);
  }

  const sectionStyle = {
    marginTop: '3rem'
  }

  const headerRow = {
    marginTop: '3rem',
    paddingTop: '1rem',
    backgroundColor: 'white'
  }

  const headerStyle = {
    marginBottom: '0',
    paddingLeft: '1rem'
  }

  const cartRow = {
    marginRight: '0',
    padding: '1rem 0',
    backgroundColor: "#e3e3e3"
  }

  const productRow = {
    marginTop: '26rem'
  }

  return (
    <div id="cart_component" style={sectionStyle}>
      <div className="row justify-content-center fixed-top" style={headerRow}>
        <div className="col-8 col-xl-7">
          <div className="row" style={cartRow}>
            <div className="col-12">
              <h1 style={headerStyle}>
                Cart&nbsp;
                ({props.order.orderItemTotal})
              </h1>
            </div>
          </div>

          <OrderLines
            data={props.order.orderItems}
            addToCart={props.addToCart}
            removeFromCart={props.removeFromCart}
            renderPrice={renderPrice} />
        </div>

        <div className="col-4 col-xl-3">
          <PromoCodeWidget
            data={props.order.promo}
            submit={props.updateOrder}
            updateTotal={props.updateTotal} />

          <TotalWidget
            promo = {props.order.promo}
            subtotal={props.order.subtotal}
            shippingFee={props.order.shipping_fee}
            salesTax={props.order.sales_tax}
            total={props.order.total} />
        </div>
      </div>

      <div className="row justify-content-center" style={productRow}>
        <div className="col-12 col-xl-10">
          <div className="row" style={cartRow}>
            <div className="col-12">
              <h2 style={headerStyle}>Add to Cart</h2>
            </div>
          </div>

          <ProductDisplay
            items={props.inventory}
            addToCart={props.addToCart} />
        </div>
      </div>
    </div>
  )
}

export default Cart;
