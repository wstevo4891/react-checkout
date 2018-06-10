import React from 'react';
import axios from 'axios';

import * as actions from '../actions';
import OrderLines from '../widgets/OrderLines';
import AddressCard from '../widgets/AddressCard';
import { ShippingMethodWidget } from '../widgets/ShippingMethodWidget';
import { PromoCodeWidget } from '../widgets/PromoCodeWidget';
import TotalWidget from '../widgets/TotalWidget';
import '../styles/review.css';

export class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;

    this.updateData = this.updateData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateData(data, key) {
    this.setState({
      [key]: data
    });
  }

  handleSubmit() {
    const order = actions.buildOrder(this.props.order);
    console.log(JSON.stringify(order));

    axios.post('http://jst.edchavez.com/api/' + JSON.stringify(order) + '/')
      .then(function(response) {
        console.log('Thank You. Your order was submitted.');
        console.log(response.data);
      })
      .catch(function(error) {
        console.log('Something went wrong while submitting order');
        console.log(error);
      });
  }

  renderPrice(item) {
    return ((item.price * 0.01) * item.qtyOrdered).toFixed(2);
  }

  render() {
    const footerSpace = {
      marginBottom: '6em'
    }

    const rowHeight = {
      marginTop: '27px'
    }

    return (
      <div id="orderReview" style={footerSpace}>
        <h1 style={this.props.headerStyle}>Review Order</h1>

        <div className="row">
          <div className="col-sm-4">
            <AddressCard data={this.props.order.shippingInfo} title="Ship To" />
          </div>

          <div className="col-sm-4">
            <AddressCard data={this.props.order.billingInfo} title="Bill To" />
          </div>

          <div className="col-sm-4">
            <ShippingMethodWidget
              data={this.props.order.shippingMethod}
              shippingOptions={this.props.shippingOptions}
              selectedMethod={this.props.order.selectedMethod}
              updateOrder={this.props.updateOrder}
              updateTotal={this.props.updateTotal} />
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <OrderLines
              data={this.props.order.orderItems}
              renderPrice={this.renderPrice}
              addToCart={this.props.addToCart}
              removeFromCart={this.props.removeFromCart} />
          </div>

          <div className="col-4" style={rowHeight}>
            <PromoCodeWidget
              data={this.props.order.promo}
              submit={this.props.updateOrder}
              updateTotal={this.props.updateTotal} />

            <TotalWidget
              promo = {this.props.order.promo}
              subtotal={this.props.order.subtotal}
              shippingFee={this.props.order.shipping_fee}
              salesTax={this.props.order.sales_tax}
              total={this.props.order.total} />

            <button className="btn btn-success submit-order"
                    onClick={this.handleSubmit}>
              Submit Order
            </button>
          </div>
        </div>
      </div>
    );
  }
}
