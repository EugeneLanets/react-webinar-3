import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, isInCart = false, onItemAction }) {
  const callbacks = {
    onItemAction,
  };

  const cn = bem('List');

  return (
    <div className={cn({ ['in-cart']: isInCart })}>
      {list.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            actionText={isInCart ? 'Удалить' : 'Добавить'}
            onClick={callbacks.onItemAction}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  isInCart: PropTypes.bool,
  onItemAction: PropTypes.func,
};

List.defaultProps = {
  isInCart: false,
};

export default React.memo(List);
