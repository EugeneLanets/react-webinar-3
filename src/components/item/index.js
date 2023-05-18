import React from "react";
import PropTypes from "prop-types";
import {priceFormatter} from "../../utils";
import './style.css';

function Item(props){

  const callbacks = {
    onClick: props.onClick
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
      { props.item.quantity
          ? <div className="Item-quantity">
              {`${props.item.quantity} шт`}
            </div>
          : null
      }
      <div className='Item-actions'>
        <button onClick={() => callbacks.onClick(props.item.code)}>
          {props.actionText}
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
    count: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  actionText: PropTypes.string,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {},
  actionText: 'Нажать'
}

export default React.memo(Item);
