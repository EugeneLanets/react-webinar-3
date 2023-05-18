import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {getCartTotalPrice, plural, priceFormatter} from "../../utils";

function CartReview({cart}){
  const getText = (cart) => {
    const quantity = cart.length;
    const word = plural(cart.length, {one: 'товар', few: 'товара', many: 'товаров'});
    const totalPrice = getCartTotalPrice(cart);
    const formattedTotalPrice = priceFormatter(totalPrice);

    return `${quantity} ${word} / ${formattedTotalPrice}`;
  }
  
  return (
    <div className='CartReview'>
      <div className='CartReview-text'>
        {`В корзине: `}
        <b>
          {cart.length
            ? getText(cart)
            : 'пусто'
          }
        </b>
      </div>
      <div className="CartReview-actions">
        <button onClick={() => onAdd()}>Перейти</button>
      </div>
    </div>
  )
}

CartReview.propTypes = {
  card: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
  onAdd: PropTypes.func
};

CartReview.defaultProps = {
  onAdd: () => {}
}

export default React.memo(CartReview);
