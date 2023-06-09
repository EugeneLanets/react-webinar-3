import Field from '../field';
import PropTypes from 'prop-types';

function CommentForm(props) {
  return (
    <Field label={props.title}>
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </Field>
  );
}
CommentForm.propTypes = {
  title: PropTypes.string,
};
export default CommentForm;
