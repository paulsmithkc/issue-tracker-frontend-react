import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/project" element={<Navigate to="/project/list" />} />
          <Route path="/project/list" element={<ProjectListPage />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
