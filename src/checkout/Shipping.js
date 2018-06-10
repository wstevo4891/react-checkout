import React from 'react';
import { Redirect } from 'react-router';

import '../styles/shipping.css';

export class Shipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.shipAddress;
    this.redirect = false;

    this.nextStep = this.props.nextStep;
    this.previousStep = this.props.previousStep;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit('shippingInfo', this.state);
    this.redirect = true;
  }

  render() {
    if (this.redirect) {
      return (
        <Redirect to="/checkout/payment" />
      );
    }

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <h1 style={this.props.headerStyle}>Shipping Address</h1>

          <form id="shippingInfo" className="row" onSubmit={this.handleSubmit}>
            <div className="col">
              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="street_address_1"
                    placeholder="Street Address *" className="form-control"
                    value={this.state.street_address_1}
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
                    value={this.state.street_address_2}
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
                    value={this.state.street_address_3}
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
                    value={this.state.city}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <select
                    name="state"
                    className="form-control"
                    value={this.state.state}
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
                    value={this.state.country}
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
                    value={this.state.zipcode}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row justify-content-center">
                <button
                  type="submit"
                  id="submitShipAddress"
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


// <div onClick={this.previousStep} className={styles.arrowButton + ' ' + styles.prev}>
//   <i className="fa fa-chevron-left"></i>
// </div>
// <div onClick={this.nextStep} className={styles.arrowButton + ' ' + styles.next}>
//   <i className="fa fa-chevron-right"></i>
// </div>
