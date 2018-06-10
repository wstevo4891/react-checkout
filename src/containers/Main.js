import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import * as actions from '../actions';
import OrderModel from '../OrderModel';
import Home from './Home';
import Cart from './Cart';
import { Checkout } from './Checkout';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      order: OrderModel.order
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }

  fetchInventory() {
    const self = this;
    axios.get('http://jst.edchavez.com/api/inventory/getInventory/')
      .then(function(response) {
        console.log("Retrieved Inventory");
        self.setState({
          inventory: response.data.items
        });
        console.log("inventory: " + JSON.stringify(response.data));
        sessionStorage.setItem('inventory', JSON.stringify(response.data.items));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  addOrderItem(item) {
    let order = this.state.order;

    console.log("order items: " + JSON.stringify(order.orderItems));
    console.log("item: " + JSON.stringify(item));

    if (item.inStock === false) {
      alert('This item is Out of Stock :/');

    } else if (!Array.isArray(order.orderItems) || !order.orderItems.length) {
      console.log("orderItems is empty");
      item.qtyOrdered = 1;
      order.orderItems.push(item);
      order.orderItemTotal = 1;

      this.setState({
        order: order
      });

    } else if (actions.findItem(item, order.orderItems, true)) {
      console.log("Update quantity of order item");

      let foundItem = actions.findItem(item, order.orderItems, false);
      console.log(foundItem);

      const index = (order.orderItems).indexOf(foundItem);
      foundItem.qtyOrdered += 1;
      order.orderItems[index] = foundItem;
      order.orderItemTotal = actions.calcOrderItemTotal(order.orderItems);

      this.setState({
        order: order
      });

    } else {
      console.log("Add new item to orderItems");
      item.qtyOrdered = 1;
      order.orderItems.push(item);
      order.orderItemTotal = actions.calcOrderItemTotal(order.orderItems);

      this.setState({
        order: order
      });
    }
  }

  subtractOrderItem(item) {
    let order = this.state.order;
    console.log("order items: " + JSON.stringify(order.orderItems));
    console.log("item: " + JSON.stringify(item));

    if (actions.findItem(item, order.orderItems, true)) {
      console.log("Update quantity of order item");

      let foundItem = actions.findItem(item, order.orderItems, false);
      console.log(foundItem);

      if (foundItem.qtyOrdered === 0) {
        return alert("This item's quantity is 0.");
      } else {
        const index = (order.orderItems).indexOf(foundItem);
        foundItem.qtyOrdered -= 1;
        order.orderItems[index] = foundItem;
        order.orderItemTotal = actions.calcOrderItemTotal(order.orderItems);

        this.setState({
          order: order
        });
      }
    }
  }

  updateTotal() {
    let order = this.state.order;

    const subTotal = actions.calcSubtotal(order.orderItems, order.promo);

    const salesTax = actions.calcSalesTax(subTotal);

    const shippingFee = actions.calcShippingFee(order.shipping_fee, order.shippingMethod.shipCost);

    const total = actions.calcTotal(subTotal, shippingFee, salesTax);

    order.subtotal = subTotal;
    order.sales_tax = salesTax;
    order.shipping_fee = shippingFee;
    order.total = total;

    this.setState({
      order: order
    });

    this.props.updateCount(this.state.order.orderItemTotal);
  }

  addToCart(event) {
    const dataId = event.target.dataset.id;
    const arr = this.state.inventory;

    const item = arr.find(function(obj) {
      return obj.itemId === dataId;
    });

    console.log("addToCart item: " + JSON.stringify(item));

    const p = Promise.resolve(this.addOrderItem(item));

    p.then((res) => this.updateTotal());
  }

  removeFromCart(event) {
    const dataId = event.target.dataset.id;
    const arr = this.state.inventory;

    const item = arr.find(function(obj) {
      return obj.itemId === dataId;
    });

    console.log("removeFromCart item: " + JSON.stringify(item));

    const p = Promise.resolve(this.subtractOrderItem(item));

    p.then((res) => this.updateTotal());
  }

  updateOrder(key, data) {
    let order = this.state.order;

    this.setState({
      [order[key]]: data
    });

    if (typeof(this.state.order.promo) === 'object') {
      const subtotal = this.state.order.subtotal * 100;
      order.subtotal = subtotal;

      this.setState({
        order: order
      });
    }
  }

  componentDidMount() {
    console.log("Main.js Mounted!");
    console.log("sessionStorage: " + JSON.stringify(sessionStorage));

    if (sessionStorage.getItem('inventory')) {
      let inventoryItems = JSON.parse(sessionStorage.getItem('inventory'));
      this.setState({
        inventory: inventoryItems
      });
    } else {
      this.fetchInventory();
    }

    if (sessionStorage.getItem('order')) {
      let orderData = JSON.parse(sessionStorage.getItem('order'));
      this.setState({
        order: orderData
      });
    }
  }

  componentDidUpdate() {
    sessionStorage.setItem('order', JSON.stringify(this.state.order));
    console.log('Main updated!');
    console.log(this.state);
  }

  render() {
    const topMargin = {
      marginTop: '56px'
    }

    return (
      <main className="container-fluid" style={topMargin}>
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              <Home
                inventory={this.state.inventory}
                addToCart={this.addToCart} />
            } />
          <Route
            path='/cart'
            render={() =>
              <Cart
                inventory={this.state.inventory}
                order={this.state.order}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
                addOrderItem = {this.addOrderItem}
                updateOrder={this.updateOrder}
                updateTotal={this.updateTotal} />
            } />
          <Route
            path='/checkout'
            render={() =>
              <Checkout
                order={this.state.order}
                updateOrder={this.updateOrder}
                updateTotal={this.updateTotal}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart} />
            } />
        </Switch>
      </main>
    )
  }
}
