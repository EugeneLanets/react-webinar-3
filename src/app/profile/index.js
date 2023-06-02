import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import UserPanel from '../../containers/user-panel';

function Profile(props) {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
    </PageLayout>
  );
}

Profile.propTypes = {};

export default memo(Profile);
