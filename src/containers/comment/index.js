import PropTypes from 'prop-types';
import ShowForm from '../show-form';
import CommentArticle from '../../components/comment-article';
import CommentWrapper from '../../components/comment-wrapper';

function Comment(props) {
  const level = props.level + 1;
  const callbacks = {
    onUnmount: () => {
      const element = document.getElementById(props.comment._id);
      if (element) {
        element.scrollIntoView();
      }
    },
  };

  const showForm = props.showAnswer(props.comment._id);
  const shoulRenderWrapper = props.comment.children.length !== 0 || showForm;
  return (
    <>
      <CommentArticle
        comment={props.comment}
        onAnswer={props.onAnswer}
        key={props.comment._id}
      />
      {shoulRenderWrapper ? (
        <CommentWrapper level={props.level}>
          {props.comment.children
            ? props.renderChildren(props.comment.children, level)
            : null}
          <ShowForm
            showForm={showForm}
            render={props.renderCancelButton}
            text={', чтобы иметь возможность ответить'}
            title={'Новый ответ'}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
            newComment={props.newComment}
            shouldFocus={true}
            onUnmount={callbacks.onUnmount}
          />
        </CommentWrapper>
      ) : null}
    </>
  );
}
Comment.propTypes = {
  level: PropTypes.number,
  onAnswer: PropTypes.func,
  onReset: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  showAnswer: PropTypes.func,
  newComment: PropTypes.string,
  renderCancelButton: PropTypes.func,
  renderChildren: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.string,
    level: PropTypes.number,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
    dateCreate: PropTypes.string,
    children: PropTypes.array,
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }),
};
export default Comment;
