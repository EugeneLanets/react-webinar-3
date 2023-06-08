import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

function Comment(props) {
  const style = { '--left': `${props.comment.level * 10}px` };
  const cn = bem('Comment');
  const options = {
    date: {
      dateStyle: 'long',
      timeStyle: 'short',
    },
  };
  const formattedDate = props.comment.dateCreate.toLocaleString(
    'ru',
    options.date
  );
  return (
    <article key={props.comment._id} style={style} className={cn()}>
      <div className={cn('name')}>{props.comment.author.profile.name}</div>
      <datetime className={cn('datetime')}>{formattedDate}</datetime>
      <div className={cn('text')}>{props.comment.text}</div>
    </article>
  );
}
Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    level: PropTypes.number,
    text: PropTypes.string,
    dateCreate: PropTypes.instanceOf(Date),
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }),
};
export default Comment;
