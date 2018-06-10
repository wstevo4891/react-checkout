import React from 'react';

const PromoLine = (props) => {
  if (props.promo.promotionType === 'PercentOff') {
    return (
      <div className="row">
        <div className="col-7">Promotion</div>
        <div className="col-5">-{props.promo.promoAmt}%</div>
      </div>
    );

  } else if (props.promo.promotionType === 'ValueOff') {
    return (
      <div className="row">
        <div className="col-7">Promotion</div>
        <div className="col-5">-${props.promo.promoAmt}</div>
      </div>
    );
  }
};

export default PromoLine;
