import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../app';
import Main from '../app/main';
import CatalogItem from '../app/catalog-item';
import useStore from '../store/use-store';

function Router() {
  const store = useStore();

  const itemLoader = async ({ params }) => {
    await store.actions.catalogItem.load(params.itemId);
    return null;
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          path: '/',
          element: <Main />,
        },
        {
          path: '/catalog/:itemId',
          element: <CatalogItem />,
          loader: itemLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
