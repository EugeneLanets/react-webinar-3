import AuthCheck from '../auth-check';
import CommentForm from '../../components/comment-form';
import ShouldLogin from '../../components/should-login';
import PropTypes from 'prop-types';

function ShowForm(props) {
  return props.showForm ? (
    <AuthCheck
      showIfTrue={<CommentForm title={props.title} render={props.render} />}
      showIfFalse={
        <ShouldLogin
          text={props.text}
          to={'/login'}
          link={'Войдите'}
          render={props.render}
        />
      }
    />
  ) : null;
}

ShowForm.propTypes = {
  showForm: PropTypes.bool,
  render: PropTypes.func,
  text: PropTypes.string,
  title: PropTypes.string,
};

ShowForm.defaulProps = {
  render: () => null,
};

export default ShowForm;
