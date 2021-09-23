import { gql } from '@apollo/client';

export const QUERY_TASK = gql`
  {
    queryTask {
      id
      title
      completed
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($title: String!) {
    addTask(input: {title: $title, completed: false}) {
      task {
        id
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: [ID!]) {
    deleteTask(filter: {id: $id}) {
      task {
        id
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($id: [ID!], $title: String, $completed: Boolean) {
    updateTask(input: {filter: {id: $id}, set: {title: $title, completed: $completed}}) {
      numUids
    }
  }
`;
