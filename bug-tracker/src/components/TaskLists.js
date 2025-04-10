import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import TaskTrendChart from './TaskTrend';
import "../components/animation.css"

const TaskList = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeTimerId, setActiveTimerId] = useState(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
    return () => clearInterval(timerRef.current);
  }, [user]);

  const loadTasks = () => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    const relevantTasks =
      user?.role === 'Manager'
        ? stored
        : stored.filter(
            task =>
              task.assignee === user?.username || task.createdBy === user?.username
          );
    setTasks(relevantTasks);
  };

  const updateTasksInStorage = (updated) => {
    localStorage.setItem('tasks', JSON.stringify(updated));
    loadTasks();
  };

  const handleDelete = (id) => {
    const updated = tasks.filter(task => task.id !== id);
    updateTasksInStorage(updated);
  };

  const handleEdit = (task) => {
    navigate('/create', { state: { task } });
  };

  const markAsPendingApproval = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status: 'Pending Approval' } : task
    );
    updateTasksInStorage(updated);
    alert('Task submitted for approval.');
  };

  const updateStatus = (id, newStatus) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    updateTasksInStorage(updated);
    alert(`Task ${newStatus === 'Closed' ? 'approved and closed' : 'reopened'}.`);
  };

  const startTimer = (id) => {
    setActiveTimerId(id);
    timerRef.current = setInterval(() => {
      setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? { ...task, timeSpent: parseFloat((task.timeSpent + 0.01).toFixed(2)) }
            : task
        )
      );
    }, 36000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setActiveTimerId(null);
    updateTasksInStorage(tasks);
  };

  const handleFilter = (e) => {
    const status = e.target.value;
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    const relevant =
      user?.role === 'Manager'
        ? stored
        : stored.filter(
            task =>
              task.assignee === user?.username || task.createdBy === user?.username
          );
    const filtered = status === 'All' ? relevant : relevant.filter(task => task.status === status);
    setTasks(filtered);
  };

  return (
    <div className="container">
      {/* <h2 style={{ fontFamily: 'Poppins', fontWeight: '600', fontSize: '28px' }}> */}
      <h2 style={{ fontSize: '28px', color: '#2d3436' }}>
        {user?.role === 'Manager' ? 'All Tasks' : 'My Tasks'}
      </h2>

      {user?.role === 'Developer' && (
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/create')}
            className="task-button" style={{borderRadius:"20px",justifyContent:"flex-start",width:"fit-content"}}
          >
            + Create New Task
          </button>
        </div>
      )}

      <TaskTrendChart />

      {tasks.length > 0 && (
        <div style={{ margin: '10px 0' }}>
          <label style={{ fontWeight: 'bold' }}>Filter by Status: </label>
          <select onChange={handleFilter} style={{ padding: '6px', borderRadius: '6px' }}>
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Closed">Closed</option>
            <option value="Reopened">Reopened</option>
          </select>
        </div>
      )}

      {tasks.length === 0 ? (
        <p>No tasks found. Let’s create one now!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="fade-in"
              style={{
                // marginBottom: '20px',
                // padding: '12px',
                // borderBottom: '1px solid #ddd',
                // backgroundColor: '#f9f9f9',
                // borderRadius: '10px'
                padding: '15px',
                border: '1px solid #dfe6e9',
                borderRadius: '10px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9',
                marginLeft:"-1.8vh"
              }}
            >
              <strong style={{ fontSize: '18px' }}>{task.title}</strong><br />
              <small>Priority: {task.priority} | Status: {task.status}</small><br />
              <small>Assigned to: {task.assignee} | Created by: {task.createdBy}</small><br />
              <small>Date: {task.date}</small><br />
              <small>Time Spent: {task.timeSpent.toFixed(2)} hrs</small>
              <p>{task.description}</p>

              {user?.role === 'Developer' && task.createdBy === user?.username && task.status !== 'Closed' && (
                <>
                  <button onClick={() => handleEdit(task)} className="task-button" style={{ borderRadius:"20px" }}>Edit</button>
                  <button onClick={() => handleDelete(task.id)} className="task-button" style={{ backgroundColor: '#e74c3c',borderRadius:"20px" }}>Delete</button>
                  {task.status !== 'Pending Approval' && (
                    <button onClick={() => markAsPendingApproval(task.id)} className="task-button" style={{ backgroundColor: '#3498db' ,borderRadius:"20px"}}>
                      Mark as Complete
                    </button>
                  )}
                  {activeTimerId === task.id ? (
                    <button onClick={stopTimer} className="task-button" style={{ backgroundColor: '#8e44ad' ,borderRadius:"20px"}}>
                      Stop Timer
                    </button>
                  ) : (
                    <button onClick={() => startTimer(task.id)} className="task-button" style={{ backgroundColor: '#2ecc71' ,borderRadius:"20px"}}>
                      Start Timer
                    </button>
                  )}
                </>
              )}

              {user?.role === 'Manager' && task.status === 'Pending Approval' && (
                <>
                  <button onClick={() => updateStatus(task.id, 'Closed')} className="task-button" style={{ backgroundColor: '#2ecc71' }}>
                    Approve
                  </button>
                  <button onClick={() => updateStatus(task.id, 'Reopened')} className="task-button" style={{ backgroundColor: '#f39c12' }}>
                    Reopen
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
