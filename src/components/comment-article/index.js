import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
function CommentArticle(props) {
  const cn = bem('Comment');

  const options = {
    date: {
      dateStyle: 'long',
      timeStyle: 'short',
    },
  };

  const formattedDate = props.comment.dateCreate
    .toLocaleString('ru', options.date)
    .replace(' г.', '');

  return (
    <article key={props.comment._id} className={cn()}>
      {props.comment.isDeleted ? (
        <p className={cn('deleted')}>(Комментарий удалён)</p>
      ) : (
        <>
          <header className={cn('head')}>
            <div className={cn('name')}>
              {props.comment.author.profile.name}
            </div>
            <time className={cn('datetime')}>{formattedDate}</time>
          </header>
          <main>
            <div className={cn('text')}>{props.comment.text}</div>
          </main>
          <footer className={cn('footer')}>
            <button
              className={cn('answer')}
              onClick={() => props.onAnswer(props.comment._id)}
            >
              Ответить
            </button>
          </footer>
        </>
      )}
    </article>
  );
}

CommentArticle.propTypes = {
  onAnswer: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.string,
    level: PropTypes.number,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
    dateCreate: PropTypes.instanceOf(Date),
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }),
};
export default CommentArticle;
