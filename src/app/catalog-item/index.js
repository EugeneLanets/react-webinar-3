import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import { useCallback } from 'react';
import ItemInfo from '../../components/item-info';

function CatalogItem() {
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const item = useSelector((state) => state.catalogItem);

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
  };

  // useEffect(() => {
  //   store.actions.catalogItem.load(params.itemId);
  // }, []);

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
