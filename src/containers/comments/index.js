import { useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import checkParentType from '../../utils/check-parent-type';
import Comment from '../../components/comment';
import SectionLayout from '../../components/section-layout';
import CommentForm from '../../components/comment-form';
import { useState } from 'react';

function Comments() {
  const [addForm, setAddForm] = useState(null);
  const select = useSelectorRedux((state) => ({
    comments: state.comments.data?.items ?? [],
  }));

  const tree = listToTree(select.comments, '_id', (item) =>
    checkParentType(item, '_type', 'comment')
  );

  const list = treeToList(tree, (item, level) => ({
    ...item,
    dateCreate: new Date(item.dateCreate),
    level,
  }));

  const callbacks = {
    onAnswer: (id) => {
      setAddForm(id);
    },
  };

  return (
    <>
      <SectionLayout
        padding={'large'}
        title={`Комментарии (${select.comments.length})`}
      >
        {list.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            showForm={addForm === comment._id}
            onAnswer={callbacks.onAnswer}
          />
        ))}

        {addForm === null ? <CommentForm title="Новый комментарий" /> : null}
      </SectionLayout>
    </>
  );
}

export default Comments;
