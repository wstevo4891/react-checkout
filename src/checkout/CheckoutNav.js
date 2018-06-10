import React from 'react';
import { Link } from 'react-router-dom';

export class CheckoutNav extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const linkName = e.target.text();
    let active;
    switch(linkName) {
      case 'Contact':
        active = 'Contact Info';
        break;
      case 'Shipping':
        active = 'Shipping Address';
        break;
      case 'Payment':
        active = 'Payment Info';
        break;
      case 'Billing':
        active = 'Billing Info';
        break;
      case 'Review':
        active = 'Review Order';
    }
    this.props.onClick(active);
  }

  render () {
    const navStyle = {
      margin: "0 -15px",
      backgroundColor: "#e3e3e3"
    }

    return (
      <header style={navStyle}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="nav container-fluid">
            <li className="nav-item col">
              <Link
                className="nav-link text-center active"
                to='/checkout/contact' >
                Contact
              </Link>
            </li>
            <li className="nav-item col">
              <Link
                className="nav-link text-center"
                to='/checkout/shipping' >
                Shipping
              </Link>
            </li>
            <li className="nav-item col">
              <Link
                className="nav-link text-center"
                to='/checkout/payment' >
                Payment
              </Link>
            </li>
            <li className="nav-item col">
              <Link
                className="nav-link text-center"
                to='/checkout/billing' >
                Billing
              </Link>
            </li>
            <li className="nav-item col">
              <Link
                className="nav-link text-center"
                to='/checkout/review' >
                Review
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
