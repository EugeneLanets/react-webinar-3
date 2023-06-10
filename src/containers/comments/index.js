import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import checkParentType from '../../utils/check-parent-type';
import Comment from '../comment';
import SectionLayout from '../../components/section-layout';
import { useState } from 'react';
import ShowForm from '../show-form';
import { useParams } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';

function Comments() {
  const dispatch = useDispatch();
  const [addForm, setAddForm] = useState('article');
  const [newComment, setNewComment] = useState('');
  const select = useSelectorRedux((state) => ({
    comments: state.comments.data?.items ?? [],
    error: state.comments.error,
  }));
  const params = useParams();

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
    onSubmit: () => {
      const isArticleChild = addForm === 'article';
      const parent = {
        _id: isArticleChild ? params.id : addForm,
        _type: isArticleChild ? 'article' : 'comment',
      };
      const data = {
        text: newComment,
        parent,
      };
      dispatch(commentsActions.post(data));
    },
    onReset: () => {
      setAddForm('article');
      setNewComment('');
    },
    onChange: (evt) => {
      setNewComment(evt.target.value);
    },
    showAnswer: (id) => id === addForm,
  };

  const render = {
    cancelButton: (cn) => (
      <button type={'reset'} onClick={callbacks.onReset} className={cn}>
        Отмена
      </button>
    ),
  };

  const renderComments = (list, level = 0) => {
    return list.map((comment) => {
      return (
        <Comment
          comment={comment}
          showAnswer={callbacks.showAnswer}
          onAnswer={callbacks.onAnswer}
          onReset={callbacks.onReset}
          onChange={callbacks.onChange}
          onSubmit={callbacks.onSubmit}
          newComment={newComment}
          renderCancelButton={render.cancelButton}
          renderChildren={renderComments}
          key={comment._id}
          level={level + 1}
          shouldFocus={callbacks.shouldFocus}
          error={select.error?.message}
        />
      );
    });
  };

  return (
    <>
      <SectionLayout padding={'large'} title={`Комментарии (${counter})`}>
        {renderComments(tree)}

        <ShowForm
          showForm={addForm === 'article'}
          text={', чтобы иметь возможность комментировать'}
          title={'Новый комментарий'}
          onChange={callbacks.onChange}
          onSubmit={callbacks.onSubmit}
          newComment={newComment}
          shouldFocus={false}
          error={select.error?.message}
        />
      </SectionLayout>
    </>
  );
}

export default Comments;
