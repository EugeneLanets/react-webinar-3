import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import { useCallback } from 'react';
import ItemInfo from '../../components/item-info';

import LangSwitcher from '../../components/LangSwitcher';
import Navbar from '../../components/Navbar';
import Menu from '../../components/Menu';

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
    //Смена языка
    changeLanguage: useCallback(
      (lang) => store.actions.language.setTranslation(lang),
      [store]
    ),
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  const renders = {
    langSwitch: useCallback(() => {
      return <LangSwitcher onLangChange={callbacks.changeLanguage} />;
    }, [callbacks.changeLanguage]),
  };

  return (
    <PageLayout>
      <Head title={item.title} render={renders.langSwitch} />
      <Navbar>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Navbar>
      <ItemInfo onAddToCart={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default CatalogItem;
