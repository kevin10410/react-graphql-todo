import Task from './Task';

const Tasks = props => {
  if (props.error) return <p>Error...</p>
  if (props.loading) return <p>Loading...</p>

  return (
    <ul className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {
        props.tasks
          .map(task => (
            <Task
              id={task.id}
              key={task.id}
              name={task.title}
              completed={task.completed}
              queryRefetch={props.queryRefetch}
            />
          ))
      }
    </ul>
  );
};

export default Tasks;