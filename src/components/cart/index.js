import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Modal from '../modal'
import Head from '../head'
import List from '../list'
import { getCartTotalPrice, priceFormatter } from '../../utils'

function Cart({ cart, onCartClose, onItemDelete }) {
  const callbacks = {
    onCartClose,
  }

  const TotalList = () => (
    <>
      <List list={cart} isInCart={true} onItemAction={onItemDelete} />
      <div className="Cart-total">
        <b>
          Итого
          <span className="Cart-total-price">
            {priceFormatter(getCartTotalPrice(cart))}
          </span>
        </b>
      </div>
    </>
  )

  return (
    <Modal>
      <div className="Cart">
        <Head title="Корзина" classNames={['Cart-head']}>
          <div className="Cart-actions">
            <button onClick={callbacks.onCartClose}>Закрыть</button>
          </div>
        </Head>
        {cart.length ? (
          <TotalList />
        ) : (
          <div className="Cart-empty">В корзине ничего нет</div>
        )}
      </div>
    </Modal>
  )
}

export default React.memo(Cart)
