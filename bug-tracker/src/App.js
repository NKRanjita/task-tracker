import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from "./components/AuthContext"
import Login from './components/Login';
import TaskList from './components/TaskLists';
import TaskForm from './components/TaskForm';
import ManagerDashboard from './components/ManagerDashboard';



const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Developer']}>
                <TaskList />
              </ProtectedRoute>
            }
          />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />

          <Route
            path="/task-form"
            element={
              <ProtectedRoute allowedRoles={['Developer']}>
                <TaskForm />
              </ProtectedRoute>
            }
          />
          <Route path="/create" element={<TaskForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
