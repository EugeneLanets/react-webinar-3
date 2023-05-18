import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { getCartTotalPrice, plural, priceFormatter } from '../../utils';

function CartReview({ cart, onCartOpen }) {
  const cn = bem('CartReview');
  const callbacks = {
    onCartOpen,
  };
  const getText = (cart) => {
    const quantity = cart.length;
    const word = plural(cart.length, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    });
    const totalPrice = getCartTotalPrice(cart);
    const formattedTotalPrice = priceFormatter(totalPrice);

    return `${quantity} ${word} / ${formattedTotalPrice}`;
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        {'В корзине: '}
        <b>{cart.length ? getText(cart) : 'пусто'}</b>
      </div>
      <div className={cn('actions')}>
        <button onClick={() => callbacks.onCartOpen()}>Перейти</button>
      </div>
    </div>
  );
}

CartReview.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  onCartOpen: PropTypes.func,
};

export default React.memo(CartReview);
