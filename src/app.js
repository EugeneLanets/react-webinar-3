import React, {useCallback, useState} from 'react';
import List from "./components/list";
import CartReview from "./components/cart-review";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/Modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isCartShown, setCartShown] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code)
    }, [store]),
    onCartOpen: useCallback(() => {
      setCartShown(true);
    }, []),
    onCartClose: useCallback(() => {
      setCartShown(false)
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartReview cart={cart} onCartOpen={callbacks.onCartOpen}/>
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
      {isCartShown
        ? <Cart cart={cart} onCartClose={callbacks.onCartClose}/>
        : null
      }
    </PageLayout>
  );
}

export default App;
