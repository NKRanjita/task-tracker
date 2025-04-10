import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import "../components/animation.css"

const ManagerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignee: ''
  });

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(allTasks);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (filters.status === '' || task.status === filters.status) &&
      (filters.priority === '' || task.priority === filters.priority) &&
      (filters.assignee === '' || task.assignee === filters.assignee)
    );
  });

  const handleApprove = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status: 'Closed' } : task
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    alert('Task Approved!');
  };

  const handleReopen = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status: 'Open' } : task
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    alert('Task Reopened!');
  };

  return (
    <div className="container fade-in" style={{ fontFamily: 'Poppins, sans-serif', padding: '20px' }}>
      <h2 style={{ fontSize: '28px', color: '#2d3436' }}>📋 Manager Dashboard</h2>

      <div className="filters" style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <select name="status" onChange={handleFilterChange} className="dropdown">
          <option value="">Filter by Status</option>
          <option>Open</option>
          <option>Closed</option>
          <option>Pending Approval</option>
        </select>

        <select name="priority" onChange={handleFilterChange} className="dropdown">
          <option value="">Filter by Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select name="assignee" onChange={handleFilterChange} className="dropdown">
          <option value="">Filter by Assignee</option>
          {[...new Set(tasks.map(t => t.assignee))].map((name, idx) => (
            <option key={idx}>{name}</option>
          ))}
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#636e72' }}>No tasks found</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map(task => (
            <li key={task.id} className="task card-slide-in" style={{
              padding: '15px',
              border: '1px solid #dfe6e9',
              borderRadius: '10px',
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
              marginLeft: "-1.8vh"
            }}>
              <strong style={{ fontSize: '18px', color: '#2d3436' }}>{task.title}</strong>
              <br />
              <small>Priority: {task.priority} | Status: {task.status}</small>
              <br />
              <small>Assignee: {task.assignee}</small>

              {task.status === 'Pending Approval' && (
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleApprove(task.id)} className="approve-btn bounce-btn">✅ Approve</button>
                  <button onClick={() => handleReopen(task.id)} className="reopen-btn bounce-btn">🔄 Reopen</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManagerDashboard;
