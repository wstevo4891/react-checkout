import React from 'react';

import PromoLine from './PromoLine';
import '../styles/widgets.css';

const TotalWidget = (props) => {
  if (typeof(props.promo) === 'object') {
    return (
      <div className="total-block">
        <PromoLine promo={props.promo} />
        <div className="row">
          <div className="col-7">Subtotal</div>
          <div className="col-5">{props.subtotal.toFixed(2)}</div>
          <div className="col-7">Shipping Fee</div>
          <div className="col-5">{props.shippingFee.toFixed(2)}</div>
          <div className="col-7">Sales Tax</div>
          <div className="col-5">{props.salesTax.toFixed(2)}</div>
        </div>

        <hr className="total-hr"/>

        <div className="row">
          <div className="col-7"><b>TOTAL</b></div>
          <div className="col-5"><b>${props.total.toFixed(2)}</b></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="total-block">
        <div className="row">
          <div className="col-7">Subtotal</div>
          <div className="col-5">{props.subtotal.toFixed(2)}</div>
          <div className="col-7">Shipping Fee</div>
          <div className="col-5">{props.shippingFee.toFixed(2)}</div>
          <div className="col-7">Sales Tax</div>
          <div className="col-5">{props.salesTax.toFixed(2)}</div>
        </div>

        <hr className="total-hr"/>

        <div className="row">
          <div className="col-7"><b>TOTAL</b></div>
          <div className="col-5"><b>${props.total.toFixed(2)}</b></div>
        </div>
      </div>
    );
  }
};

export default TotalWidget
