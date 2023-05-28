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
import { useLocation, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Menu from '../../components/Menu';

function Main() {
  const store = useStore();
  const dict = useTranslation('head');

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
  }));

  const [queryParams] = useSearchParams();
  const currentPage = Number(queryParams.get('page')) || 1;

  const location = useLocation();

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
        currentPage={currentPage}
        pathname={location.pathname}
      />
    </PageLayout>
  );
}

export default memo(Main);
