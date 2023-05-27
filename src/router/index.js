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

  const pageLoader = async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? 1;
    await store.actions.catalog.load(page);
    return null;
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Main />,
          loader: pageLoader,
        },
        {
          path: '/catalog',
          element: <Main />,
          loader: pageLoader,
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
