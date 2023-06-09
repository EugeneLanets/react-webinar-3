import Field from '../field';
import PropTypes from 'prop-types';
import { useState } from 'react';

function CommentForm(props) {
  const [text, setText] = useState('');
  return (
    <form onSubmit={props.onSubmit} onReset={props.onReset}>
      <Field label={props.title}>
        <textarea name="" id="" cols="30" rows="10" value={text} />
      </Field>
      <button type={'submit'}>Отправить</button>
      <button type={'reset'}>Отмена</button>
    </form>
  );
}
CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['answer', 'comment']),
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
};

CommentForm.defaultProps = {
  type: 'answer',
  onReset: () => {},
};
export default CommentForm;
