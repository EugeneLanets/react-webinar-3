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
import Navbar from '../../components/Navbar';
import Menu from '../../components/Menu';
import Spinner from '../../components/spinner';
import useTranslation from '../../hooks/use-translation';

function Main() {
  const store = useStore();
  const { currentLanguage, languages, t, changeLanguage } = useTranslation();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
  }));

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
    //Смена языка
    changeLanguage: useCallback(
      (lang) => store.actions.language.setTranslation(lang),
      [store]
    ),
    changePage: useCallback(
      (page) => store.actions.catalog.load(page),
      [store]
    ),
  };

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
    langSwitch: useCallback(() => {
      return (
        <LangSwitcher
          onLangChange={callbacks.changeLanguage}
          currentLanguage={currentLanguage}
          languagesList={languages}
        />
      );
    }, [currentLanguage]),
  };

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  return (
    <PageLayout>
      <Head title={t('shop')} render={renders.langSwitch} />
      <Navbar>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Navbar>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalPages={select.totalPages}
        currentPage={select.currentPage}
        onPageChange={callbacks.changePage}
      />
      {select.loading === 'loading' && <Spinner />}
    </PageLayout>
  );
}

export default memo(Main);
