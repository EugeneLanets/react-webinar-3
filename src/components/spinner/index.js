import { memo } from 'react';
import './style.css';

function Spinner() {
  return <div className="Spinner">Идёт загрузка...</div>;
}

export default memo(Spinner);
