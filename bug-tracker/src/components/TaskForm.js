import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import "../components/animation.css"

const TaskForm = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const editingTask = location.state?.task;

  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    status: 'Open',
    assignee: '',
    date: '',
    timeSpent: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else if (user?.role === 'Developer') {
      setTask(prev => ({ ...prev, assignee: user.username }));
    }
  }, [editingTask, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: name === 'timeSpent' ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('tasks')) || [];

    let updatedTasks;
    if (editingTask) {
      updatedTasks = existing.map(t =>
        t.id === editingTask.id ? { ...task, id: editingTask.id } : t
      );
    } else {
      updatedTasks = [
        ...existing,
        {
          ...task,
          id: Date.now(),
          createdBy: user.username,
          assignee: task.assignee,

        },
      ];
    }

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    alert(editingTask ? 'Task Updated!' : 'Task Created!');
    navigate('/dashboard');
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        
        {editingTask ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1px',marginRight:"2vh" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />
        <select name="priority" value={task.priority} onChange={handleChange} style={styles.select}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select name="status" value={task.status} onChange={handleChange} style={styles.select}>
          {user?.role === 'Manager' ? (
            <>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Closed">Closed</option>
              <option value="Reopened">Reopened</option>
            </>
          ) : (
            <>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
            </>
          )}
        </select>

  {/* {user?.role === 'Manager' && ( */}
  <input
    type="text"
    name="assignee"
    placeholder="Assignee"
    value={task.assignee}
    onChange={handleChange}
    style={styles.input}
    required
  />
{/* )} */}


        <input
          type="date"
          name="date"
          value={task.date}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="timeSpent"
          placeholder="Time Spent (hours)"
          value={task.timeSpent}
          onChange={handleChange}
          style={styles.input}
          min="0"
          step="0.1"
        />
        <button type="submit" style={styles.button}>
          {editingTask ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      background: '#fff',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
    //   fontSize: '24px',
      marginBottom: '25px',
    //   color: '#333',
      fontSize: '28px', color: '#2d3436'
    },
    input: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
      width: '100%',
    },
    select: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
      width: '104%',
    },
    textarea: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
      width: '100%',
      height: '100px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '12px',
      border: 'none',
     marginLeft:"1.2vh",
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '16px',
      marginTop: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }
  };
export default TaskForm;
