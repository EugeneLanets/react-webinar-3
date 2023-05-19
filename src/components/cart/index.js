import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Modal from '../modal';
import Head from '../head';
import List from '../list';

import { cn as bem } from '@bem-react/classname';
import { getCartTotalPrice, priceFormatter } from '../../utils';
import CartItem from '../сart-item';

function Cart(props) {
  const cn = bem('Cart');
  const callbacks = {
    onCartClose: props.onCartClose,
    onItemDelete: props.onItemDelete,
  };

  const TotalList = () => (
    <>
      <List
        list={props.cart}
        ListItem={CartItem}
        onItemAction={callbacks.onItemDelete}
      />
      <div className={cn('total')}>
        <b>
          Итого
          <span className={cn('total-price')}>
            {priceFormatter(getCartTotalPrice(props.cart))}
          </span>
        </b>
      </div>
    </>
  );

  return (
    <Modal>
      <div className={cn()}>
        <Head title="Корзина" classNames={[cn('head')]}>
          <div className={cn('actions')}>
            <button onClick={callbacks.onCartClose}>Закрыть</button>
          </div>
        </Head>
        {props.cart.length ? (
          <TotalList />
        ) : (
          <div className={cn('empty')}>В корзине ничего нет</div>
        )}
      </div>
    </Modal>
  );
}
Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  onCartClose: PropTypes.func,
  onItemDelete: PropTypes.func,
};
export default React.memo(Cart);
