import { nanoid } from "nanoid";
import { useState } from 'react';
import From from './components/Form';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';
import './App.css';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('All');

  const [tasks, setTasks] = useState([
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false },
  ]);

  const remainingTasksNumber = tasks
    .filter(({ completed }) => completed === false)
    .length;

  const addTaskHandler = () => {
    setTasks([
      ...tasks,
      { id: "todo-" + nanoid(), name: name, completed: false }
    ]);
    setName('');
  };

  const inputChangeHandler = value => {
    setName(value);
  };

  const deleteTask = id => {
    setTasks(tasks => tasks.filter(task => id !== task.id));
  };

  const updateEditedTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      return id === task.id
        ? {...task, name: newName}
        : task;
    });

    setTasks(editedTaskList);
  }

  const toggleTaskCompleted = id => {
    const updatedTasks = tasks.map(task => {
      return id === task.id
        ? { ...task, completed: !task.completed }
        : task
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="todoapp stack-large">
      <h1>React GraphQL Todo</h1>
      <From
        name={name}
        addTaskHandler={addTaskHandler}
        inputChangeHandler={inputChangeHandler}
      />
      <div className="filters btn-group stack-exception">
        { 
          FILTER_NAMES.map(name =>
            <FilterButton
              key={name}
              name={name}
              isPressed={name === filter}
              setFilter={setFilter}
            />
          )
        }
      </div>
      <h2 id="list-heading">
        { remainingTasksNumber } tasks remaining
      </h2>
      <ul className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {
          tasks
            .filter(FILTER_MAP[filter])
            .map(task =>
              <Todo
                id={task.id}
                key={task.id}
                name={task.name}
                completed={task.completed}
                deleteTask={deleteTask}
                updateTask={updateEditedTask}
                toggleTaskCompleted={toggleTaskCompleted}
              />
          )
        }
      </ul>
    </div>
  );
}

export default App;
