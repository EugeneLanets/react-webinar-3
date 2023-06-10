import './style.css';

import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

function CommentForm(props) {
  const cn = bem('CommentForm');
  const ref = useRef();
  const callbacks = {
    onSubmit: (evt) => {
      evt.preventDefault();
      props.onSubmit();
    },
  };

  useEffect(() => {
    if (props.shouldFocus) {
      ref.current.focus();
    }
    return () => {
      props.onUnmount();
    };
  }, []);

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{props.title}</h3>
      <form onSubmit={callbacks.onSubmit}>
        <textarea
          ref={ref}
          className={cn('text')}
          value={props.newComment}
          onChange={props.onChange}
        ></textarea>
        <div className={cn('controls')}>
          <button type="submit" disabled={!props.newComment.length}>
            Отправить
          </button>
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
  onUnmount: PropTypes.func,
  newComment: PropTypes.string,
  shouldFocus: PropTypes.bool,
};

CommentForm.defaultProps = {
  title: 'Написать комментарий',
  render: () => null,
  onUnmount: () => {},
};
export default CommentForm;
