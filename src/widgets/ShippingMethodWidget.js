import React from 'react';
import date from 'date-and-time';
import axios from 'axios';

import '../styles/widgets.css';

export class ShippingMethodWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingMethod: this.props.data,
      shippingOptions: this.props.shippingOptions,
      selected: this.props.selectedOption
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const val = target.value;
    const index = parseInt(val, 10);
    const data = this.state.shippingOptions[index];

    const today = new Date();
    let delivery_date;

    if (data.shipOptionId === 'USStandard') {
      delivery_date = date.addDays(today, 4);
    } else if (data.shipOptionId === 'IntlStandard') {
      delivery_date = date.addDays(today, 8);
    }

    data.est_delivery_date = date.format(delivery_date, 'MMM DD, YYYY');

    let self = this;
    let prom = new Promise((resolve) => {
      resolve(self.setState({
        shippingMethod: data,
        selectedMethod: val,
        selected: index
      }));
    });
    prom.then(function() {
      self.props.updateOrder('shippingMethod', self.state.shippingMethod);
      self.props.updateTotal();
    });

    // let display_div = document.getElementById("display_shipping_info");

    // if ( display_div.classList.contains('show') ) {
    //   return;
    // } else {
    //   display_div.classList.add('show');
    // }

    console.log("Apply shipping method!");
  }

  componentDidMount() {
    console.log('ShippingMethodWidget Mounted!');
    console.log(this.state);
  }

  componentDidUpdate() {
    console.log('ShippingMethodWidget Updated!');
    console.log(this.state);
  }

  render() {
    const data = this.state;

    const ship_options = data.shippingOptions;

    const method = data.shippingMethod;

    const selected = data.selected;

    const ship_cost = method.shipCost * 0.01;

    return (
      <div className="review-block">
        <h2>Shipping Method</h2>

        <form id="shipMethodInfo">
          <div className="form-group">
            <select
              id="selectShipMethod"
              type="submit"
              name="shipOptionName"
              value={selected}
              className="form-control max13"
              onChange={this.handleChange} >
              <option value="">Select Shipping Method</option>
              {
                ship_options.map((option, index) => (
                  <option key={index} value={index}>{option.shipOptionName}</option>
                ))
              }
            </select>
          </div>
        </form>

        <div id="display_shipping_info">
          <p>Carrier: {method.carrierName}</p>
          <p>Arriving On: {method.est_delivery_date}</p>
          <p>Cost: ${ship_cost.toFixed(2)}</p>
        </div>
      </div>
    );
  }
}
