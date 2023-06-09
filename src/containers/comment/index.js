import './style.css';
import PropTypes from 'prop-types';
import ShowForm from '../ShowForm';
import CommentArticle from '../../components/comment-article';
import CommentWrapper from '../../components/comment-wrapper';

function Comment(props) {
  const callbacks = {
    onSubmit: (evt) => {
      evt.preventDefault();
      console.log('submit');
    },
    onReset: props.onReset,
  };

  const render = {
    cancelButton: (cn) => (
      <button type={'reset'} onClick={callbacks.onReset} className={cn}>
        Отмена
      </button>
    ),
  };

  return (
    <CommentWrapper level={props.comment.level}>
      <CommentArticle comment={props.comment} onAnswer={props.onAnswer} />
      <ShowForm
        showForm={props.showForm}
        render={render.cancelButton}
        text={', чтобы иметь возможность ответить'}
        title={'Новый ответ'}
      />
    </CommentWrapper>
  );
}
Comment.propTypes = {
  showForm: PropTypes.bool,
  onAnswer: PropTypes.func,
  onReset: PropTypes.func,
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
export default Comment;
