import './style.css';

import PropTypes from 'prop-types';
function CommentWrapper(props) {
  const max = 5;
  const level = props.level > max ? max : props.level;
  const style = { 'margin-left': `${level * 30}px` };

  return (
    <div style={style} className={'CommentWrapper'}>
      {props.children}
    </div>
  );
}

CommentWrapper.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number,
};
export default CommentWrapper;
