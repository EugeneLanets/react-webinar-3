import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../../store/use-store';
import useTranslation from '../../store/use-translation';

function BasketTool({ sum, amount, onOpen }) {
  const store = useStore();
  const cn = bem('BasketTool');
  const location = useLocation();
  const dict = useTranslation('basketTool');
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
        {dict.mainLink}
      </Link>
      <span className={cn('label')}>{dict.inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, dict.goods)} / ${numberFormat(sum)} ₽`
          : dict.empty}
      </span>
      <button onClick={onOpen}>{dict.buttonOpen}</button>
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
