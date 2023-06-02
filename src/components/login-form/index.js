import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import ColumnLayout from '../column-layout';

import LabeledInput from '../label-input';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../spinner';

function LoginForm(props) {
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
      <ColumnLayout padding={'medium'} gap={'medium'}>
        <h2 className={cn('title')}>{props.title}</h2>
        <form onSubmit={callbacks.onSubmit}>
          <ColumnLayout padding="none" gap={'medium'}>
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
            {select.error ? <div className="error">{select.error}</div> : null}
            <button type={'submit'}>{t('button.loginForm')}</button>
          </ColumnLayout>
        </form>
      </ColumnLayout>
    </Spinner>
  );
}

LoginForm.propTypes = {
  title: PropTypes.string,
};

LoginForm.defaultProps = {
  title: 'Title',
};

export default memo(LoginForm);
