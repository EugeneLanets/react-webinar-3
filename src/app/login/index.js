import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import UserPanel from '../../containers/user-panel';
import LoginForm from '../../components/login-form';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Login() {
  const store = useStore();
  const { t } = useTranslate();
  useInit(
    () => {
      store.actions.user.checkUser();
    },
    [],
    true
  );
  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Login);
