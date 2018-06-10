// src/OrderModel.js

const OrderModel = {
  order: {
    orderItems: [],
    orderItemTotal: 0,
    promo: '',
    subtotal: 0.0,
    sales_tax: 0.0,
    shipping_fee: 0.0,
    total: 0.0,
    contactInfo: {
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    },
    shippingInfo: {
      name: '',
      street_address_1: '',
      street_address_2: '',
      street_address_3: '',
      city: '',
      state: '',
      country: '',
      zipcode: ''
    },
    shippingMethod: {
      shipOptionId: '',
      shipOtptionName: '',
      carrierName: '',
      est_delivery_date: '',
      shipCost: 0.0
    },
    paymentInfo: {
      card_type: '',
      card_number: '',
      security_code: '',
      expiration_month: '',
      expiration_year: ''
    },
    billing_same_as_shipping: false,
    billingInfo: {
      name: '',
      street_address_1: '',
      street_address_2: '',
      street_address_3: '',
      country: '',
      state: '',
      zipcode: ''
    }
  },
  defaultOrderItems: [
    {
      itemId: 'RAM-B-UN7BU',
      name: 'X-Grip Phone Holder',
      description: 'UNPKD X-GRIP UNIVERSAL HOLDER W/ 1" BALL',
      price: 2799,
      qtyOrdered: 2
    },
    {
      itemId: 'RAM-B-201U',
      name: 'B-Size Double Socket Arm',
      description: 'UNPKD RAM DOUBLE SOCKET ARM FOR 1" BALL',
      price: 1399,
      qtyOrdered: 2
    },
    {
      itemId: 'RAM-B-231ZU',
      name: 'B-Size Rail Base',
      description: 'UNPKD RAM RAIL BASE W/BALL & ZINC U-BOLT',
      price: 1549,
      qtyOrdered: 2
    }
  ]
}

export default OrderModel;
