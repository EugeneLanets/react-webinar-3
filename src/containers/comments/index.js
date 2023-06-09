import { useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import checkParentType from '../../utils/check-parent-type';
import Comment from '../comment';
import SectionLayout from '../../components/section-layout';
import { useState } from 'react';
import ShowForm from '../ShowForm';

function Comments() {
  const [addForm, setAddForm] = useState('article');
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

  const counter = list.reduce((acc, item) => acc + (item.isDeleted ? 0 : 1), 0);

  const callbacks = {
    onAnswer: (id) => {
      setAddForm(id);
    },
    onSubmit: (evt) => {
      evt.preventDefault();
      console.log('submit');
    },
    onReset: () => {
      setAddForm('article');
    },
  };

  return (
    <>
      <SectionLayout padding={'large'} title={`Комментарии (${counter})`}>
        {list.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            showForm={addForm === comment._id}
            onAnswer={callbacks.onAnswer}
            onReset={callbacks.onReset}
          />
        ))}

        <ShowForm
          showForm={addForm === 'article'}
          text={', чтобы иметь возможность комментировать'}
          title={'Новый комментарий'}
        />
      </SectionLayout>
    </>
  );
}

export default Comments;
