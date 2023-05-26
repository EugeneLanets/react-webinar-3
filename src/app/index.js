import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CatalogItem from './catalog-item';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/catalog/:itemId',
    element: <CatalogItem />,
  },
]);
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <RouterProvider router={router} />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
