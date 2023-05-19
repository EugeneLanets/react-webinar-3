import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { plural, priceFormatter } from '../../utils';

function CartReview({ cart, onCartOpen }) {
  const cn = bem('CartReview');
  const callbacks = {
    onCartOpen,
  };
  const getText = (cart) => {
    const word = plural(cart.itemsQuantity, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    });
    const formattedTotalPrice = priceFormatter(cart.totalPrice);

    return `${cart.itemsQuantity} ${word} / ${formattedTotalPrice}`;
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        {'В корзине: '}
        <b>{cart.itemsQuantity ? getText(cart) : 'пусто'}</b>
      </div>
      <div className={cn('actions')}>
        <button onClick={() => callbacks.onCartOpen()}>Перейти</button>
      </div>
    </div>
  );
}

// items: PropTypes.arrayOf(
//   PropTypes.shape()),
//{
// //     price: PropTypes.number,
// //     quantity: PropTypes.number,
// //   }
// }

CartReview.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number,
        quantity: PropTypes.number,
      })
    ),
    itemsQuantity: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
  onCartOpen: PropTypes.func,
};

export default React.memo(CartReview);
