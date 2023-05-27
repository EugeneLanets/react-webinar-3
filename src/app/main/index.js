import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import LangSwitcher from '../../components/LangSwitcher';
import useTranslation from '../../store/use-translation';

function Main() {
  const store = useStore();
  const dict = useTranslation('head');

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
    setCurrentPage: useCallback(
      (page) => {
        store.actions.catalog.setCurrentPage(page);
      },
      [store]
    ),
    //Смена языка
    changeLanguage: useCallback(
      (lang) => store.actions.language.setTranslation(lang),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
    langSwitch: useCallback(() => {
      return <LangSwitcher onLangChange={callbacks.changeLanguage} />;
    }, [callbacks.changeLanguage]),
  };

  return (
    <PageLayout>
      <Head title={dict.title} render={renders.langSwitch} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination onPageChange={callbacks.setCurrentPage} />
    </PageLayout>
  );
}

export default memo(Main);
