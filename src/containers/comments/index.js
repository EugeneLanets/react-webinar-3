import { useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import checkParentType from '../../utils/check-parent-type';
import Comment from '../../components/comment';

function Comments() {
  const select = useSelectorRedux((state) => ({
    comments: state.comments.data?.items ?? [],
  }));
  const tree = listToTree(select.comments, '_id', (item) =>
    checkParentType(item, '_type', 'comment')
  );

  const list = treeToList(tree, (item, level) => ({
    ...item,
    level,
  }));

  return (
    <>
      <h2>Комментарии</h2>
      {list.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </>
  );
}

export default Comments;
