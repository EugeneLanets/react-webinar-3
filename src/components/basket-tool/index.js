import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../../store/use-store';

function BasketTool({ sum, amount, onOpen }) {
  const store = useStore();
  const cn = bem('BasketTool');
  const location = useLocation();
  return (
    <div className={cn()}>
      <Link
        to="/"
        className={cn('link')}
        onClick={() => {
          if (location.pathname === '/') {
            store.actions.catalog.setCurrentPage(1);
          }
        }}
      >
        Главная
      </Link>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
          : 'пусто'}
      </span>
      <button onClick={onOpen}>Перейти</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
