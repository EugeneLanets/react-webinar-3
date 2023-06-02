import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import UserPanel from '../../containers/user-panel';
import UserCard from '../../containers/user-card';

function Profile() {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserCard />
    </PageLayout>
  );
}

Profile.propTypes = {};

export default memo(Profile);
