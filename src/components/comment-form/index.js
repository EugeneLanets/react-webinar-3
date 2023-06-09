import './style.css';

import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function CommentForm(props) {
  const cn = bem('CommentForm');
  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{props.title}</h3>
      <form action="">
        <textarea className={cn('text')}></textarea>
      </form>
      <div className={cn('controls')}>
        <button type="submit">Отправить</button>
        {props.render()}
      </div>
    </div>
  );
}
CommentForm.propTypes = {
  title: PropTypes.string,
  render: PropTypes.func,
};

CommentForm.defaultProps = {
  title: 'Написать комментарий',
  render: () => null,
};
export default CommentForm;
