import React from 'react';
import PropTypes from 'prop-types';
import { priceFormatter } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    onClick: props.onClick,
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{priceFormatter(props.item.price)}</div>
      {props.item.quantity ? (
        <div className={cn('quantity')}>{`${props.item.quantity} шт`}</div>
      ) : null}
      <div className={cn('actions')}>
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
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  actionText: PropTypes.string,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  actionText: 'Нажать',
};

export default React.memo(Item);
