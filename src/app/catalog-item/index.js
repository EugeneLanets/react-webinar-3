import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import { useCallback, useEffect } from 'react';
import ItemInfo from '../../components/item-info';

import LangSwitcher from '../../components/LangSwitcher';
import Navbar from '../../components/Navbar';
import Menu from '../../components/Menu';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner';

function CatalogItem() {
  const store = useStore();

  const params = useParams();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    languages: state.language.allLanguages,
    currentLanguage: state.language.currentLanguage,
    item: state.catalogItem.item,
    loading: state.catalogItem.loading,
  }));

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
      return (
        <LangSwitcher
          onLangChange={callbacks.changeLanguage}
          currentLanguage={select.currentLanguage}
          languagesList={select.languages}
        />
      );
    }, [callbacks.changeLanguage]),
  };

  useEffect(() => {
    store.actions.modals.close();
    store.actions.catalogItem.load(params.itemId);
  }, []);

  return (
    <PageLayout>
      <Head title={select.item?.title} render={renders.langSwitch} />
      <Navbar>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Navbar>
      <ItemInfo onAddToCart={callbacks.addToBasket} item={select.item} />
      {select.loading === 'loading' && <Spinner />}
    </PageLayout>
  );
}

export default CatalogItem;
