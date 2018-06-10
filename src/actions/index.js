// app/actions/index.js

export function findItem(item, arr, bool) {
  let found = arr.find(function(obj) {
    return obj.itemId === item.itemId;
  });

  if (bool === false) {
    return found;

  } else if (bool === true) {
    if (typeof(found) === 'object') {
      console.log("It's true!");
      return true;

    } else {
      console.log("It's false!");
      return false;
    }
  }
}

export function findPromo(item, arr) {
  const found = arr.find(function(obj) {
    return obj.promotionType === item;
  });

  return found;
}

export function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export function calcSubtotal(items, promo) {
  let subtotal = 0;
  if (items === '') {
    return 0.00;
  } else {
    for (let item of items) {
      subtotal += ((item.price * 0.01) * item.qtyOrdered);
    }

    if (promo === '') {
      return round(subtotal, 2);

    } else if (promo.promotionType === 'PercentOff') {
      let percent = 1.00 - (0.01 * promo.promoAmt);
      subtotal = subtotal * percent;

    } else if (promo.promotionType === 'ValueOff') {
      subtotal = subtotal - promo.promoAmt;
    }
    return round(subtotal, 2);
  }
}

export function calcSalesTax(subtotal) {
  const tax = subtotal * 0.1000522;
  return round(tax, 2);
}

export function calcShippingFee(shippingFee, shipCost) {
  if (shipCost > 0) {
    return shipCost * 0.01;
  } else if (shippingFee === 0.0 || shippingFee === 5) {
    return 5;
  }
}

export function calcTotal(subtotal, shippingFee, salesTax) {
  return subtotal + shippingFee + salesTax;
}

export function calcOrderItemTotal(orderItems) {
  let total = 0;

  for (let item of orderItems) {
    total += item.qtyOrdered;
  }

  return total;
}

export function buildOrder(data) {
  return {
    merchantId: 'sample string 1',
    orderItems: data.orderItems,
    promotion: data.promo,
    taxTotal: data.sales_tax * 100,
    shippingTotal: data.shipping_fee * 100,
    merchantOrderReference: 'Some Reference',
    orderDate: Math.floor(Date.now() / 1000),
    signature: 'Unused. A digital signature for this object'
  }
}
