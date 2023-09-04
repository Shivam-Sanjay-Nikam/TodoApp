import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { useTodoContext } from '../hooks/useTodoContext';
import binImage from '../assets/bin.png';
import editImage from '../assets/edit.png';
import { useAuthContext } from '../hooks/useAuthContext';
import TodoUpdateForm from '../components/ TodoUpdateForm'; // Import the update form component

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false); // Track whether update form is open

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch('/api/todolist/' + todo._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_TODO', payload: json });
    }
  };

  const handleUpdate = () => {
    setIsUpdateFormOpen(true); // Open the update form
  };

  const onUpdateTodo = (updatedTodo) => {
    // Implement the logic to update the todo
    console.log('Updating todo:', updatedTodo._id);
  };

  // Format the due date to display in a specific format
  const formattedDueDate = format(new Date(todo.duedate), 'MMMM dd, yyyy');

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div>
        <h4 className="text-lg font-semibold text-blue-500 mb-2">{todo.title}</h4>
        <p><strong>Description: </strong>{todo.description}</p>
        <p><strong>Priority: </strong>{todo.priority}</p>
        <p><strong>Status: </strong>{todo.status}</p>
        <p><strong>DueDate: </strong>{formattedDueDate}</p> {/* Use the formattedDueDate here */}
        <p className='text-gray-500'>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
      </div>
      <div className="flex space-x-4">
        <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300">
          <img src={editImage} alt="Edit" className="h-6 w-6 rounded-full" />
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300">
          <img src={binImage} alt="Delete" className="h-6 w-6 rounded-full" />
        </button>
      </div>

      {/* Render the update form if isUpdateFormOpen is true */}
      {isUpdateFormOpen && (
        <TodoUpdateForm todo={todo} onUpdate={onUpdateTodo} onClose={() => setIsUpdateFormOpen(false)} />
      )}
    </div>
  );
};

export default TodoDetails;
