import { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { useAuthContext } from '../hooks/useAuthContext';

const CreateTodo = () => {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState('');
  const [duedate, setDuedate] = useState(null); // Added duedate state
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const formStyle = {
    maxWidth: '1000px', // Adjust the width as needed
    width:'400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const todo = { title, description, priority, status, duedate }; // Include duedate

    const response = await fetch('/api/todolist/', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setEmptyFields([]);
      setError(null);
      setTitle('');
      setDescription('');
      setPriority(0);
      setStatus('');
      setDuedate(null); // Reset duedate
      dispatch({ type: 'CREATE_TODO', payload: json });
    }
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-4">Add a New Todo</h3>

      <label className="block mb-2">Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={`w-full p-2 border ${
          emptyFields.includes('title') ? 'border-red-500' : 'border-gray-300'
        } rounded`}
      />

      <label className="block mb-2 mt-4">Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={`w-full p-2 border ${
          emptyFields.includes('description') ? 'border-red-500' : 'border-gray-300'
        } rounded`}
      />

      <label className="block mb-2 mt-4">Priority:</label>
      <input
        type="number"
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
        className={`w-full p-2 border ${
          emptyFields.includes('priority') ? 'border-red-500' : 'border-gray-300'
        } rounded`}
      />

      <label className="block mb-2 mt-4">Status:</label>
      <input
        type="text"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
        className={`w-full p-2 border ${
          emptyFields.includes('status') ? 'border-red-500' : 'border-gray-300'
        } rounded`}
      />

      <label className="block mb-2 mt-4">Duedate:</label>
      <input
        type="date"
        onChange={(e) => setDuedate(e.target.value)}
        value={duedate || ''}
        className={`w-full p-2 border ${
          emptyFields.includes('duedate') ? 'border-red-500' : 'border-gray-300'
        } rounded`}
      />

      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Todo
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </form>
  );
};

export default CreateTodo;
