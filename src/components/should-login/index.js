import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function ShouldLogin(props) {
  const cn = bem('ShouldLogin');
  return (
    <div>
      <Link to={props.to} className={cn('link')}>
        {props.link}
      </Link>
      {props.text}
      {props.render(cn('reset'))}
    </div>
  );
}

ShouldLogin.propTypes = {
  to: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  render: PropTypes.func,
};

ShouldLogin.defaultProps = {
  render: () => null,
};

export default ShouldLogin;
