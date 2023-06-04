import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import Profile from './profile';
import AuthRoot from '../components/auth-root';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route element={<AuthRoot />}>
          <Route path={'/profile'} element={<Profile />} />
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
