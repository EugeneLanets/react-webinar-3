import SideLayout from '../../components/side-layout';
import useTranslate from '../../hooks/use-translate';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from '../../components/login-button';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import { useCallback } from 'react';

function UserPanel() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    userName: state.user.user.name,
  }));

  const callbacks = {
    onSignIn: () => navigate('/login'),
    onSignOut: useCallback(() => {
      store.actions.user.logout();
    }, [store]),
  };
  const buttonText = select.isAuth ? 'button.logout' : 'button.login';
  const callback = select.isAuth ? callbacks.onSignOut : callbacks.onSignIn;
  return (
    <SideLayout side={'end'} padding={'medium'}>
      {select.isAuth ? (
        <Link to={'/profile'} key={'profile'}>
          {select.userName}
        </Link>
      ) : null}
      <LoginButton text={t(buttonText)} onNavigate={callback} />
    </SideLayout>
  );
}

UserPanel.propTypes = {};

UserPanel.defaultProps = {};

export default UserPanel;
