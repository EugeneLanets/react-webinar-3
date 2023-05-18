import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Modal from "../Modal";
import Head from "../head";
import List from "../list";

function Cart({cart}) {
  return (
    <Modal>
      <div className="Cart">
        <Head title='Корзина' />
        <List list={cart}></List>
      </div>
    </Modal>
  )
}



export default Cart;
