import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { Motion, spring } from 'react-motion';
import axios from 'axios';

import { CheckoutNav } from '../checkout/CheckoutNav';
import { Contact } from '../checkout/Contact';
import { Shipping } from '../checkout/Shipping';
import { Payment } from '../checkout/Payment';
import { Billing } from '../checkout/Billing';
import { Review } from '../checkout/Review';

export class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      order: this.props.order,
      shippingOptions: []
    };

    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.fetchShippingOptions = this.fetchShippingOptions.bind(this);
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  }

  previousStep() {
    this.setState({
      step: this.state.step - 1
    });
  }

  fetchShippingOptions() {
    const self = this;
    axios.get('http://jst.edchavez.com/api/shipping/')
      .then(function(response) {
        self.setState({
          shippingOptions: response.data
        });
        sessionStorage.setItem('shippingOptions', JSON.stringify(response.data));
        console.log("shippingOptions: " + JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    if (sessionStorage.getItem('shippingOptions')) {
      const shipOptions = JSON.parse(sessionStorage.getItem('shippingOptions'));
      console.log("shippingOptions: " + JSON.stringify(shipOptions));
      this.setState({
        shippingOptions: shipOptions
      });
    } else {
      this.fetchShippingOptions();
    }
  }

  render() {
    const headerStyle = {
      textAlign: 'center',
      margin: '1em 0'
    }

    const buttonStyle = {
      margin: '1em 0 4em'
    }

    return (
      <div id="checkout_component">
        <CheckoutNav />
        <Switch>
          <Route
            exact
            path='/checkout/contact'
            render={() =>
              <Contact
                data={this.props.order.contactInfo}
                nextStep={this.nextStep}
                submit={this.props.updateOrder}
                headerStyle={headerStyle}
                buttonStyle={buttonStyle} />
            } />
          <Route
            path='/checkout/shipping'
            render={() =>
              <Shipping
                shipAddress={this.props.order.shippingInfo}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                submit={this.props.updateOrder}
                headerStyle={headerStyle}
                buttonStyle={buttonStyle} />
            } />
          <Route
            path='/checkout/payment'
            render={() =>
              <Payment
                data={this.props.order.paymentInfo}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                submit={this.props.updateOrder}
                headerStyle={headerStyle}
                buttonStyle={buttonStyle} />
            } />
          <Route
            path='/checkout/billing'
            render={() =>
              <Billing
                data={this.props.order.billingInfo}
                shippingAddress={this.state.order.shippingInfo}
                sameAsShipping={this.state.order.billingSameAsShipping}
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                submit={this.props.updateOrder}
                headerStyle={headerStyle}
                buttonStyle={buttonStyle} />
            } />
          <Route
            path='/checkout/review'
            render={() =>
              <Review
                previousStep={this.previousStep}
                order={this.props.order}
                addToCart={this.props.addToCart}
                removeFromCart={this.props.removeFromCart}
                updateOrder={this.props.updateOrder}
                updateTotal={this.props.updateTotal}
                shippingOptions={this.state.shippingOptions}
                headerStyle={headerStyle} />
            } />
        </Switch>
      </div>
    );
  }
}


// <Motion style={{ x: spring(this.getStepState()) }}>
//   {value =>
//     <form id="shipMethodInfo" className={styles.shipping_component} onSubmit={this.handleSubmit} style={{
//       transform: `translate3d(${value.x}vw, 0vw, 0)`
//     }}>
//     </form>
//   }
// </Motion>
