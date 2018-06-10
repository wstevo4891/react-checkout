import React from 'react';
import ProductDisplay from '../widgets/ProductDisplay';

const Home = (props) => {
  const headerStyle = {
    margin: '1em auto',
    paddingTop: '1em'
  }

  return (
    <div id="home_component">
      <h1 className="text-center" style={headerStyle}>Welcome to React Checkout</h1>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="jumbotron text-center">
            <h2>Add to Cart then Check Out</h2>
          </div>
        </div>
      </div>

      <ProductDisplay
        items={props.inventory}
        addToCart={props.addToCart} />
    </div>
  )
}

export default Home;
