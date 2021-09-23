import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_TASK, ADD_TASK } from './graphql/query';

import From from './components/Form';
import Tasks from './components/Tasks';
import FilterButton from './components/FilterButton';
import './App.css';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
    refetch: queryRefetch,
  } = useQuery(QUERY_TASK);

  const [
    addTask,
    {
      error: addError,
      loading: addLoading,
    }
  ] = useMutation(ADD_TASK, {
    refetchQueries: [QUERY_TASK],
    onQueryUpdated(observableQuery) {
      setName('');
      return observableQuery.refetch();
    },
  });

  const [name, setName] = useState('');
  const [filter, setFilter] = useState('All');

  const tasks = queryData?.queryTask
    .filter(FILTER_MAP[filter]);

  const remainingTasksNumber = queryLoading || queryError
    ? 0
    : queryData.queryTask
        .filter(({ completed }) => completed === false)
        .length;


  const inputChangeHandler = value => {
    setName(value);
  };

  const addTaskHandler = () => {
    addTask({
      variables: {
        title: name,
      },
    })
  };

  return (
    <div className="todoapp stack-large">
      <h1>React GraphQL Todo</h1>
      <From
        name={name}
        error={addError}
        loading={addLoading}
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
      <Tasks
        tasks={tasks}
        error={queryError}
        loading={queryLoading}
        queryRefetch={queryRefetch}
      />
    </div>
  );
}

export default App;
