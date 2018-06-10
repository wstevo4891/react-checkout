import React from 'react';
import '../styles/widgets.css';

const AddressCard = (props) => (
  <div className="review-block">
    <h2>{props.title}</h2>
    <p>{props.data.name}</p>
    <p>{props.data.street_address_1}</p>
    <p>
      {props.data.city},
      {props.data.state}&nbsp;
      {props.data.zipcode}
    </p>
    <p>{props.data.country}</p>
  </div>
);

export default AddressCard;
