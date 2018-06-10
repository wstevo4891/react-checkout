import React from 'react';
import { Redirect } from 'react-router';

import OrderModel from '../OrderModel';

export class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billing: this.props.data,
      shipping: this.props.shippingAddress,
      same_as_shipping: this.props.sameAsShipping
    }
    this.redirect = false;

    this.billingSameAsShipping = this.billingSameAsShipping.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  billingSameAsShipping(event) {
    const target = event.target;

    if (target.checked) {
      this.setState({
        billing: this.state.shipping,
        same_as_shipping: true
      });
    } else {
      this.setState({
        billing: OrderModel.order.billingInfo,
        same_as_shipping: false
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      billing: {
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit('billingInfo', this.state.billing);
    this.props.submit('billingSameAsShipping', this.state.same_as_shipping);
    this.redirect = true;
    console.log(this.redirect);
  }

  componentDidMount() {
    console.log("shipping: " + JSON.stringify(this.state.shipping));
  }

  componentDidUpdate() {
    console.log("billing: " + JSON.stringify(this.state.billing));
    console.log('same_as_shipping: ' + this.state.same_as_shipping);
  }

  render() {
    if (this.redirect) {
      return (
        <Redirect to="/checkout/review" />
      );
    }

    const checkboxRow = {
      marginBottom: '1em'
    }

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <h1 style={this.props.headerStyle}>Billing Address</h1>

          <form id="billingInfo" className="row" onSubmit={this.handleSubmit}>
            <div className="col">
              <div className="form-row" style={checkboxRow}>
                <div className="form-check col">
                  <label className="form-check-label">
                    <input
                      id="order_billing_same_as_shipping"
                      type="checkbox"
                      name="same_as_shipping"
                      className="form-check-input"
                      value={this.state.same_as_shipping}
                      onChange={this.billingSameAsShipping} />
                    &nbsp;&nbsp;
                    Billing Address Same As Shipping
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="form-control"
                    value={this.state.billing.name}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="street_address_1"
                    placeholder="Street Address *"
                    className="form-control"
                    value={this.state.billing.street_address_1}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="street_address_2"
                    placeholder="Street Address (Optional)"
                    className="form-control"
                    value={this.state.billing.street_address_2}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="street_address_3"
                    placeholder="Street Address (Optional)"
                    className="form-control"
                    value={this.state.billing.street_address_3}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="form-control"
                    value={this.state.billing.city}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <select
                    name="state"
                    className="form-control"
                    value={this.state.billing.state}
                    onChange={this.handleInputChange} >
                    <option value="">State</option>
                    <option value="AL">Alabama</option>
                    <option value="GA">Georgia</option>
                    <option value="WA">Washington</option>
                    <option value="AST">Astana, Glorious Capital</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <select
                    name="country"
                    className="form-control"
                    value={this.state.billing.country}
                    onChange={this.handleInputChange} >
                    <option value="">Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="KZ">Kazakhstan is Greatest Country in World</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="zipcode"
                    placeholder="Zip Code"
                    className="form-control"
                    value={this.state.billing.zipcode}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg" style={this.props.buttonStyle} >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
