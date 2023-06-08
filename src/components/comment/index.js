import './style.css';

function Comment({ comment }) {
  return (
    <div
      key={comment._id}
      style={{ '--left': `${comment.level * 10}px` }}
      className={'Comment'}
    >
      <div>{comment.author.profile.name}</div>
      <div>{comment.dateCreate}</div>
      <div>{comment.text}</div>
    </div>
  );
}

export default Comment;
