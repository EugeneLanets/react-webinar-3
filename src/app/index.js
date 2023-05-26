import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CatalogItem from './catalog-item';
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/catalog/:itemId" element={<CatalogItem />} />
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </BrowserRouter>
    </>
  );
}

export default App;
