import React from 'react';
import { Redirect } from 'react-router';

export class Contact extends React.Component {
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
    this.props.submit('contactInfo', this.state);
    this.redirect = true;
    console.log(this.redirect);
  }

  componentWillReceiveProps(newProps) {
    this.setState(function() {
      return newProps.data;
    });
  }

  render() {
    if (this.redirect === true) {
      return (
        <Redirect to="/checkout/shipping" />
      );
    }

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <h1 style={this.props.headerStyle}>Contact Info</h1>

          <form id="contactInfo" className="row" onSubmit={this.handleSubmit} >
            <div className="col">
              <div className="form-row">
                <div className="form-group col-12">
                  <input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    value={this.state.first_name}
                    onChange={this.handleInputChange} />
                </div>
                <div className="form-group col-12">
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    value={this.state.last_name}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-12">
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.handleInputChange} />
                </div>
                <div className="form-group col-12">
                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    className="form-control"
                    value={this.state.phone}
                    onChange={this.handleInputChange} />
                </div>
              </div>

              <div className="form-row justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={this.props.buttonStyle} >
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
