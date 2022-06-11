import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectListPage() {
  const [state, setState] = useState({});
  const { pending, error, projects } = state;

  useEffect(() => {
    setState({ pending: 'Fetching projects...' });
    axios
      .get('http://localhost:4000/api/project/list')
      .then((res) => {
        console.log('Projects loaded.');
        setState({ projects: res.data });
      })
      .catch((err) => {
        console.error(err.message);
        setState({ error: err.message });
      });
  }, []);

  return (
    <main id="ProjectListPage" className="container p-3">
      <h1 id="ProjectListHeader" className="text-center">
        Project List
      </h1>
      <div>
        {pending && (
          <div>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="false"
            ></span>
            <span>{pending}</span>
          </div>
        )}
        {error && <div className="text-danger">{error}</div>}
        {projects && (
          <div id="ProjectListContent">
            {projects.map((project) => (
              <div className="card mb-2">
                <div className="card-body">
                  <div className="card-title h4">
                    <Link to={'/project/' + project.id}>{project.title}</Link>
                  </div>
                  <div className="card-text">{project.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ProjectListPage;
