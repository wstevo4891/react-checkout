import React, { Component } from 'react';

import { Nav } from './containers/Nav';
import { Main } from './containers/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    };
    this.updateCount = this.updateCount.bind(this);
  }

  updateCount(count) {
    this.setState({
      cartCount: count
    });
  }

  componentDidMount() {
    if (sessionStorage.getItem('order')) {
      const order = JSON.parse(sessionStorage.getItem('order'));

      this.setState({
        cartCount: order.orderItemTotal
      });
    }
  }

  render() {
    return (
      <div>
        <Nav count={this.state.cartCount} />
        <Main updateCount={this.updateCount} />
      </div>
    );
  }
}

export default App;
