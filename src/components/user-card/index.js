import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import Spinner from '../spinner';
import ServicePageLayout from '../service-page-layout';
import KeyValueList from '../key-value-list';
import KeyValueItem from '../key-value-item';

function UserCard() {
  const { t } = useTranslate();

  const user = useSelector((state) => state.user.user);

  return (
    <ServicePageLayout
      head={t('profile.title')}
      padding={'medium'}
      gap={'medium'}
    >
      <KeyValueList>
        <KeyValueItem itemKey={t('profile.name')} value={user.name} />
        <KeyValueItem itemKey={t('profile.phone')} value={user.phone} />
        <KeyValueItem itemKey={t('profile.email')} value={user.email} />
      </KeyValueList>
    </ServicePageLayout>
  );
}

UserCard.propTypes = {
  title: PropTypes.string,
};

UserCard.defaultProps = {
  title: 'Title',
};

export default memo(UserCard);
