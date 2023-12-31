import { createContext, useReducer } from 'react';

export const TodoContext = createContext();

export const TodoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODO':
      return {
        todos: action.payload,
      };
    case 'CREATE_TODO':
      const newTodos = [action.payload, ...state.todos];
      // Sort the todos by priority 
      newTodos.sort((a, b) => b.priority - a.priority);
      return {
        todos: newTodos,
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((t) => t._id !== action.payload._id),
      };
      case 'UPDATE_TODO':
        const updatedTodoIndex = state.todos.findIndex((t) => t._id === action.payload._id);
        if (updatedTodoIndex === -1) {
          return state; // If the todo to update isn't found, return the current state
        }
        
        const updatedTodos = [...state.todos];
        updatedTodos[updatedTodoIndex] = action.payload;
        updatedTodos.sort((a, b) => b.priority - a.priority);
        return {
          todos: updatedTodos,
        };
      
    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: null,
  });

  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
