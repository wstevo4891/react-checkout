import React from 'react';
import date from 'date-and-time';

import '../styles/widgets.css';

export class ShippingMethodWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingMethod: this.props.data,
      shippingOptions: this.props.shippingOptions,
      selectedMethod: this.props.selectedMethod
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = document.getElementById("selectShipMethod");
    const val = target.value;
    let index = parseInt(val, 10);
    let data = this.state.shippingOptions[index];

    let today = new Date();
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
        selectedMethod: val
      }));
    });
    prom.then(function() {
      self.props.updateOrder('shippingMethod', self.state.shippingMethod);
      self.props.updateTotal();
    });

    let display_div = document.getElementById("display_shipping_info");

    if ( display_div.classList.contains('show') ) {
      return;
    } else {
      display_div.classList.add('show');
    }

    console.log("Apply shipping method!");
  }

  render() {
    let ship_options = this.state.shippingOptions;

    const ship_cost = this.state.shippingMethod.shipCost * 0.01;

    return (
      <div className="review-block">
        <h2>Shipping Method</h2>

        <form id="shipMethodInfo">
          <div className="form-group">
            <select
              id="selectShipMethod"
              type="submit"
              name="shipOptionName"
              className="form-control max13"
              value={this.state.selectedMethod}
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

        <div id="display_shipping_info" className="collapse">
          <p>Carrier: {this.state.shippingMethod.carrierName}</p>
          <p>Arriving On: {this.state.shippingMethod.est_delivery_date}</p>
          <p>Cost: ${ship_cost.toFixed(2)}</p>
        </div>
      </div>
    );
  }
}
