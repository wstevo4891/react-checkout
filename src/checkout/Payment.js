import React from 'react';
import { Redirect } from 'react-router';

export class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.redirect = false;

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
    this.props.submit('paymentInfo', this.state);
    this.redirect = true;
  }

  render() {
    if (this.redirect) {
      return (
        <Redirect to="/checkout/billing" />
      );
    }

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <h1 style={this.props.headerStyle}>Payment Info</h1>
          
          <form id="paymentInfo" className="row" onSubmit={this.handleSubmit}>
            <div className="col-12">
              <div className="form-row">
                <div className="form-group col">
                  <select
                    name="card_type"
                    className="form-control"
                    value={this.state.card_type}
                    onChange={this.handleInputChange} >
                    <option value="">Select Card Type</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="Discover">Discover</option>
                    <option value="American Express">American Express</option>
                    <option value="Diner's Club">Diner's Club</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="card_number"
                    placeholder="Card Number"
                    className="form-control"
                    defaultValue={this.state.card_number}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    name="security_code"
                    placeholder="Security Code"
                    className="form-control"
                    defaultValue={this.state.security_code}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-sm-6">
                  <select
                    name="expiration_month"
                    className="form-control"
                    defaultValue={this.state.expiration_month}
                    onChange={this.handleInputChange} >
                    <option value="">Exp Month</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>

                <div className="form-group col-sm-6">
                  <select
                    name="expiration_year"
                    className="form-control"
                    defaultValue={this.state.expiration_year}
                    onChange={this.handleInputChange} >
                    <option value="">Exp Year</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12">
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


// <div className="col-12">
//   <h2 style={this.props.headerStyle}>Billing Address</h2>
// </div>
//
// <Billing data={this.props.billingData} />
