import SideLayout from '../../components/side-layout';
import useTranslate from '../../hooks/use-translate';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginButton from '../../components/login-button';
import useSelector from '../../hooks/use-selector';

function UserPanel() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);

  const callbacks = {
    onSign: (path) => navigate(path),
  };
  const buttonText = isAuth ? 'button.logout' : 'button.login';
  const signRoute = isAuth ? '/' : '/login';
  return (
    <SideLayout side={'end'} padding={'medium'}>
      {isAuth ? (
        <Link to={'/profile'} key={'profile'}>
          Profile
        </Link>
      ) : null}
      <LoginButton
        text={t(buttonText)}
        onNavigate={() => callbacks.onSign(signRoute)}
      />
    </SideLayout>
  );
}

UserPanel.propTypes = {};

UserPanel.defaultProps = {};

export default UserPanel;
