import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Modal from "../modal";
import Head from "../head";
import List from "../list";

function Cart({cart, onCartClose, onItemDelete}) {
  const callbacks = {
    onCartClose
  }
  return (
    <Modal>
      <div className="Cart">
        <Head title='Корзина' classNames={['Cart-head']}>
          <div className="Cart-actions">
            <button onClick={callbacks.onCartClose}>Закрыть</button>
          </div>
        </Head>
        {
          cart.length
            ? <List list={cart} isInCart={true} onItemAction={onItemDelete}></List>
            : <div className='Cart-empty'>В корзине ничего нет</div>
        }
      </div>
    </Modal>
  )
}



export default React.memo(Cart);
