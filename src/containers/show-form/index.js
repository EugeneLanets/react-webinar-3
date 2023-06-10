import AuthCheck from '../auth-check';
import CommentForm from '../../components/comment-form';
import ShouldLogin from '../../components/should-login';
import PropTypes from 'prop-types';

function ShowForm(props) {
  const renders = {
    ifTrue: () => (
      <CommentForm
        title={props.title}
        render={props.render}
        onChange={props.onChange}
        onSubmit={props.onSubmit}
        newComment={props.newComment}
        shouldFocus={props.shouldFocus}
        onUnmount={props.onUnmount}
        error={props.error}
      />
    ),

    ifFalse: () => (
      <ShouldLogin
        text={props.text}
        to={'/login'}
        link={'Войдите'}
        render={props.render}
        shouldFocus={props.shouldFocus}
        onUnmount={props.onUnmount}
      />
    ),
  };
  return props.showForm ? (
    <AuthCheck showIfTrue={renders.ifTrue} showIfFalse={renders.ifFalse} />
  ) : null;
}

ShowForm.propTypes = {
  showForm: PropTypes.bool,
  render: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  newComment: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  shouldFocus: PropTypes.bool,
  onUnmount: PropTypes.func,
  error: PropTypes.string,
};

ShowForm.defaulProps = {
  render: () => null,
  onUnmount: () => {},
  error: null,
};

export default ShowForm;
