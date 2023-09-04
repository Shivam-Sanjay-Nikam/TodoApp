import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTodoContext } from '../hooks/useTodoContext';

const TodoUpdateForm = ({ todo, onUpdate, onClose }) => {
  const { user } = useAuthContext();
  const { dispatch } = useTodoContext();
  const [updatedTodo, setUpdatedTodo] = useState({ ...todo });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Perform the update operation
      const response = await fetch(`/api/todolist/${todo._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      const updatedData = await response.json();

      onUpdate(updatedData);
      onClose();
      dispatch({ type: 'UPDATE_TODO', payload: updatedData });
    } catch (err) {
      setError('Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-lg">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Update Todo</h2>
        <label htmlFor="title" className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          value={updatedTodo.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4 shadow-sm focus:ring focus:ring-blue-500"
        />
        <label htmlFor="description" className="block mb-2 font-semibold">Description:</label>
        <input
          type="text"
          name="description"
          value={updatedTodo.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4 shadow-sm focus:ring focus:ring-blue-500"
        />
        <label htmlFor="priority" className="block mb-2 font-semibold">Priority:</label>
        <input
          type="text"
          name="priority"
          value={updatedTodo.priority}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4 shadow-sm focus:ring focus:ring-blue-500"
        />
        <label htmlFor="status" className="block mb-2 font-semibold">Status:</label>
        <input
          type="text"
          name="status"
          value={updatedTodo.status}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4 shadow-sm focus:ring focus:ring-blue-500"
        />
        <label htmlFor="duedate" className="block mb-2 font-semibold">Due Date:</label>
        <input
          type="text"
          name="duedate"
          value={updatedTodo.duedate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4 shadow-sm focus:ring focus:ring-blue-500"
        />
        <div className="flex justify-end">
          {isLoading ? (
            <button className="bg-gray-300 text-gray-700 p-2 rounded-full cursor-not-allowed" disabled>
              Saving...
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400"
              >
                Close
              </button>
            </>
          )}
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default TodoUpdateForm;
