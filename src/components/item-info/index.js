import { cn as bem } from '@bem-react/classname';
import useSelector from '../../store/use-selector';
import { priceFormatter } from '../../utils';
import './style.css';
import useTranslation from '../../store/use-translation';
import propTypes from 'prop-types';

function ItemInfo({ onAddToCart }) {
  const item = useSelector((state) => state.catalogItem);
  const dict = useTranslation('item');
  const cn = bem('ItemInfo');

  return (
    <section className="ItemInfo">
      <p className={cn('paragraph')}>{item.description}</p>
      <p className={cn('paragraph')}>
        {dict.madeIn}: <b>{`${item.country.title} (${item.country.code})`}</b>
      </p>
      <p className={cn('paragraph')}>
        {dict.category}: <b>{item.category}</b>
      </p>
      <p className={cn('paragraph')}>
        {dict.edition}: <b>{item.edition}</b>
      </p>
      <p className={cn('paragraph', { type: 'price' })}>
        {dict.price}: {priceFormatter(item.price)}
      </p>
      <button type={'button'} onClick={() => onAddToCart(item._id)}>
        {dict.buttonAdd}
      </button>
    </section>
  );
}

ItemInfo.propTypes = {
  onAddToCart: propTypes.func,
};

ItemInfo.defaultProps = {
  onAddToCart: () => {},
};

export default ItemInfo;
