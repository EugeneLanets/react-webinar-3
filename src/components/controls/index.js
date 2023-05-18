import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}){
  return (
    <div className='Controls'>
      <div className='Controls-text'>
        {`В корзине:   `}
        <b>пусто</b>
      </div>
      <div className="Controls-actions">
        <button onClick={() => onAdd()}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
