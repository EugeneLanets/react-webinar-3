import './style.css';

import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function CommentForm(props) {
  const cn = bem('CommentForm');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{props.title}</h3>
      <form onSubmit={props.onSubmit}>
        <textarea
          className={cn('text')}
          value={props.newComment}
          onChange={props.onChange}
        ></textarea>
        <div className={cn('controls')}>
          <button type="submit">Отправить</button>
          {props.render()}
        </div>
      </form>
    </div>
  );
}
CommentForm.propTypes = {
  title: PropTypes.string,
  render: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  newComment: PropTypes.string,
};

CommentForm.defaultProps = {
  title: 'Написать комментарий',
  render: () => null,
};
export default CommentForm;
