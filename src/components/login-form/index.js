import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import LabeledInput from '../label-input';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../spinner';
import ServicePageLayout from '../service-page-layout';

function LoginForm() {
  const cn = bem('LoginForm');
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    login: state.user.credentials.login,
    password: state.user.credentials.password,
    error: state.user.error,
    waiting: state.user.waiting,
  }));

  const callbacks = {
    onLoginChange: useCallback(
      (login) => store.actions.user.setCredentials({ login }),
      [store]
    ),
    onPasswordChange: useCallback(
      (password) => store.actions.user.setCredentials({ password }),
      [store]
    ),
    onSubmit: useCallback(
      (evt) => {
        evt.preventDefault();
        store.actions.user.login();
      },
      [store]
    ),
  };
  return (
    <Spinner active={select.waiting}>
      <ServicePageLayout
        head={t('login.title')}
        padding={'medium'}
        gap={'medium'}
      >
        <form onSubmit={callbacks.onSubmit} className={cn()}>
          <LabeledInput
            name={t('field.login')}
            id={'login'}
            onChange={callbacks.onLoginChange}
            value={select.login}
          />
          <LabeledInput
            name={t('field.password')}
            id={'password'}
            type={'password'}
            value={select.password}
            onChange={callbacks.onPasswordChange}
          />
          {select.error ? (
            <div className={cn('error')}>{select.error}</div>
          ) : null}
          <button type={'submit'}>{t('button.loginForm')}</button>
        </form>
      </ServicePageLayout>
    </Spinner>
  );
}

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default memo(LoginForm);
