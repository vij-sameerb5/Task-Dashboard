import React, { useState } from 'react';
import './App.css';
import { Task } from './Task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [search, setSearch] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setTasks([...tasks, { id: Date.now(), title, priority }]);
      setTitle('');
      setPriority('low');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Task Dashboard - create 🔥</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '15px', padding: '8px', width: '100%' }}
      />

      {/* Task Form */}
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value as Task['priority'])}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {/* Task Cards */}
      <div className="task-grid">
        {filteredTasks.map((task) => (
          <div key={task.id} className={`task-card ${task.priority}`}>
            <h4>{task.title}</h4>
            <p>Priority: {task.priority}</p>
            <button onClick={() => deleteTask(task.id)} style={{
              background: '#ff4d4f',
              border: 'none',
              padding: '5px 10px',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
