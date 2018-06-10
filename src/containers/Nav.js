import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Nav extends Component {
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
        break;
      default:
        active = 'Contact Info';
        break;
    }
    this.props.onClick(active);
  }

  render () {
    const countStyle = {
      color: 'red',
      marginLeft: '5px'
    }

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <ul className="nav container-fluid">
            <li className="nav-item col">
              <Link
                className="nav-link text-center active"
                to='/' >
                Home
              </Link>
            </li>
            <li className="nav-item col">
              <Link
                className="nav-link text-center"
                to='/cart' >
                Cart
                <span style={countStyle}>{this.props.count}</span>
              </Link>
            </li>
            <li className="nav-item col">
              <Link
                className="nav-link text-center"
                to='/checkout/contact' >
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
