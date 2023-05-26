import { cn as bem } from '@bem-react/classname';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
function ItemInfo() {
  const store = useStore();
  const item = useSelector((state) => state.catalogItem);

  const cn = bem('ItemInfo');
  return (
    <section className="ItemInfo">
      <p className={cn('description')}>{item.description}</p>
      <p className={cn('country')}>
        Страна производитель:{' '}
        <b>{`${item.country.title} (${item.country.code})`}</b>
      </p>
      <p className={cn('category')}>
        Категория: <b>{item.category}</b>
      </p>
      <p className={cn('edition')}>
        Год выпуска: <b>{item.edition}</b>
      </p>
      <p className={cn('price')}>Цена: {item.price}</p>
      <button type={'button'}>Добавить</button>
    </section>
  );
}

export default ItemInfo;
