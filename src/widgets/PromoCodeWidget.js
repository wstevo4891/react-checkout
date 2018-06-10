import React from 'react';
import axios from 'axios';

import * as actions from '../actions';
import '../styles/widgets.css';

export class PromoCodeWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      promotions: [],
      promo: this.props.data,
      promo_code: ''
    }

    this.fetchPromotions = this.fetchPromotions.bind(this);
    this.displayPromotions = this.displayPromotions.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchPromotions() {
    const self = this;

    axios.get('http://jst.edchavez.com/api/promo/')
      .then(function(response) {
        self.setState({
          promotions: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  displayPromotions() {
    alert('Use these promotions: PercentOff, ValueOff');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      promo_code: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const self = this;
    const promotions = this.state.promotions;
    const promo_code = this.state.promo_code;
    const promo = actions.findPromo(promo_code, promotions);

    const promise = new Promise((resolve) => {
      resolve(this.setState({
        promo: promo
      }));
    });

    promise.then(function() {
      self.props.submit('promo', promo);
      self.props.updateTotal();
    });
  }

  componentDidMount() {
    this.fetchPromotions();

    const promo = this.props.data;
    console.log(`promo: ${promo}`);
  }

  componentDidUpdate() {
    console.log('PromoCodeWidget updated!');
    console.log(this.state);
  }

  render() {
    const linkMargin = {
      marginTop: '0.5rem'
    }

    return (
      <div className="promo-block">
        <div className="row">
          <div className="col">
            <h2>Apply Promo Code</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form id="promoCodeForm" onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="col-8">
                  <input
                    type="text"
                    name="promo_code"
                    placeholder="Promo Code"
                    className="form-control"
                    value={this.state.promo_code}
                    onChange={this.handleInputChange} />
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary">Apply</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col" style={linkMargin}>
            <button className="promo-codes-help" onClick={this.displayPromotions}>Help With Promotion Codes</button>
          </div>
        </div>
      </div>
    );
  }
}
