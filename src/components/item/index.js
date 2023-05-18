import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural, priceFormatter} from "../../utils";
import './style.css';

function Item(props){

  const callbacks = {
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item-price">
        {priceFormatter(props.item.price)}
      </div>
      <div className='Item-actions'>
        <button onClick={() => props.onAddToCart(props.item.code)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
}

export default React.memo(Item);
