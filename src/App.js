import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/quartz/bootstrap.min.css';

import { AuthContext } from './AppContexts';
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

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage) {
      const authValue = localStorage.getItem('auth');
      if (authValue) {
        const authParsed = JSON.parse(authValue);
        setAuth(authParsed);
      }
    }
  }, []);

  function onLogin(response) {
    const newAuth = _.pick(
      response,
      'userId',
      'email',
      'token',
      'tokenExpiresIn'
    );

    if (localStorage) {
      localStorage.setItem('auth', JSON.stringify(newAuth));
    }

    setAuth(newAuth);
    navigate('/project/list');
  }

  function onLogout(evt) {
    evt.preventDefault();

    if (localStorage) {
      localStorage.setItem('auth', null);
    }

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
