import React, { useEffect } from 'react';
import TodoDetails from '../components/TodoDetails';
import CreateTodo from '../components/CreateTodo';
import { useTodoContext } from '../hooks/useTodoContext';
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todolist/", {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const json = await response.json();
        dispatch({ type: 'SET_TODO', payload: json })
        console.error(json);
      } catch (error) {
        console.error(error);
        // Handle errors or display an error message to the user.
      }
    };

    if (user) {
      fetchTodos()
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="todos">
        {todos && todos.map(todo => (
          <TodoDetails todo={todo} key={todo._id} />
        ))}
      </div>
      <CreateTodo />
    </div>
  )
};

export default Home;
