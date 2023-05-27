import { cn as bem } from '@bem-react/classname';
import useSelector from '../../store/use-selector';
import { priceFormatter } from '../../utils';
import './style.css';
import useTranslation from '../../store/use-translation';

function ItemInfo() {
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
      <button type={'button'}>{dict.buttonAdd}</button>
    </section>
  );
}

export default ItemInfo;
