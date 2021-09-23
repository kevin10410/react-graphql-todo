import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_TASK, UPDATE_TASK } from '../../graphql/query';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todo = props => {
  const [newName, setNewName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [
    deleteTask,
    {
      loading: deleteLoading,
    }
  ] = useMutation(DELETE_TASK, {
    onCompleted: () => {
      props.queryRefetch();
    },
  });

  const [
    updateTask,
    {
      loading: updateLoading,
    }
  ] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      props.queryRefetch();
      setIsEditing(false);
    },
  });

  const deleteTaskHandler = () => {
    deleteTask({
      variables: {
        id: props.id
      }
    })
  };

  const updateTitleHandler = () => {
    updateTask({
      variables: {
        id: props.id,
        title: newName,
        completed: props.completed,
      }
    });
  };

  const completedToggleHandler = () => {
    if (updateLoading) return;
    updateTask({
      variables: {
        id: props.id,
        title: props.name,
        completed: !props.completed,
      }
    });
  };

  const cancelEdit = () => {
    setNewName('');
    setIsEditing(false);
  };

  const submitNewName = e => {
    e.preventDefault();
    props.updateTask(props.id, newName);
    setNewName("");
    setIsEditing(false);
  };

  const editingTemplate = (
    <form className="stack-small"
      onSubmit={submitNewName}
    >
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input className="todo-text"
          type="text"
          id={props.id}
          value={newName}
          onChange={e => { setNewName(e.target.value) }}
        />
      </div>
      <div className="btn-group">
        <button className="btn todo-cancel"
          type="button"
          disabled={updateLoading}
          onClick={cancelEdit}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button className="btn btn__primary todo-edit"
          type="submit"
          disabled={updateLoading || newName === ''}
          onClick={updateTitleHandler}
        >
          {
            updateLoading
              ? <FontAwesomeIcon
                  pulse
                  size="1x"
                  icon={faSpinner}
                />
              : 'Save'
          }
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          disabled={updateLoading}
          checked={props.completed}
          onChange={completedToggleHandler}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
        {
          updateLoading && <FontAwesomeIcon
            pulse
            size="lg"
            icon={faSpinner}
          />
        }
        </div>
        <div className="btn-group">
          <button className="btn"
            type="button"
            disabled={deleteLoading}
            onClick={() => setIsEditing(true)}
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button className="btn btn__danger"
            type="button"
            disabled={deleteLoading}
            onClick={deleteTaskHandler}
          >
            {
              deleteLoading
                ? <FontAwesomeIcon
                    pulse
                    size="lg"
                    icon={faSpinner}
                  />
                : 'Delete'
            }
          </button>
        </div>
    </div>
  );

  return (
    <li className="todo stack-small">
      { isEditing ? editingTemplate : viewTemplate }
    </li>
  );
};

export default Todo;
