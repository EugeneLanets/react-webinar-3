import { cn as bem } from '@bem-react/classname';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { priceFormatter } from '../../utils';
import './style.css';
import { useParams } from 'react-router-dom';

function ItemInfo() {
  const store = useStore();
  const item = useSelector((state) => state.catalogItem);

  const cn = bem('ItemInfo');
  return (
    <section className="ItemInfo">
      <p className={cn('paragraph')}>{item.description}</p>
      <p className={cn('paragraph')}>
        Страна производитель:{' '}
        <b>{`${item.country.title} (${item.country.code})`}</b>
      </p>
      <p className={cn('paragraph')}>
        Категория: <b>{item.category}</b>
      </p>
      <p className={cn('paragraph')}>
        Год выпуска: <b>{item.edition}</b>
      </p>
      <p className={cn('paragraph', { type: 'price' })}>
        Цена: {priceFormatter(item.price)}
      </p>
      <button type={'button'}>Добавить</button>
    </section>
  );
}

export default ItemInfo;
