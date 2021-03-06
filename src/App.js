import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/quartz/bootstrap.min.css';

import { AuthContext } from './AppContexts';
import { useAuthStore } from './hooks/useAuthStore';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyProfilePage from './pages/MyProfilePage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectCreatePage from './pages/ProjectCreatePage';
import IssueDetailPage from './pages/IssueDetailPage';
import IssueCreatePage from './pages/IssueCreatePage';

function App() {
  const [auth, setAuth] = useAuthStore(null);
  const navigate = useNavigate();

  function onLogin(response) {
    setAuth(_.pick(response, 'userId', 'email', 'token', 'tokenExpiresIn'));
    navigate('/project/list');
  }

  function onLogout(evt) {
    evt.preventDefault();
    setAuth(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={auth}>
      <div className="min-vh-100 d-flex flex-column">
        <Header onLogout={onLogout} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
            <Route
              path="/register"
              element={<RegisterPage onLogin={onLogin} />}
            />
            <Route path="/user/me" element={<MyProfilePage />} />
            <Route path="/project" element={<Navigate to="/project/list" />} />
            <Route path="/project/list" element={<ProjectListPage />} />
            <Route path="/project/new" element={<ProjectCreatePage />} />
            <Route path="/project/:projectId" element={<ProjectDetailPage />} />
            <Route path="/project/:projectId/issue/new" element={<IssueCreatePage />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetailPage />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
