import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ItemInfo from '../../components/item-info';

function CatalogItem() {
  const store = useStore();
  const params = useParams();
  console.log(params);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const item = useSelector((state) => state.catalogItem);
  console.log(item);

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={item.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemInfo />
    </PageLayout>
  );
}

export default CatalogItem;
