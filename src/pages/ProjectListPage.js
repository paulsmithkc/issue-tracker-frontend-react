import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AppContexts';

function ProjectListPage() {
  const auth = useContext(AuthContext);
  const [state, setState] = useState({});
  const { pending, error, projects } = state;

  useEffect(() => {
    if (!auth) {
      setState({ error: 'You are not logged in!' });
    } else {
      setState({ pending: 'Fetching projects...' });
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/project/list`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          console.log('Project list loaded.');
          setState({ projects: res.data });
        })
        .catch((err) => {
          console.error(err.message);
          setState({ error: err.message });
        });
    }
  }, [auth]);

  return (
    <main id="ProjectListPage" className="container p-3">
      <h1 id="ProjectListHeader" className="text-center">
        Project List
      </h1>
      <div>
        {pending && (
          <div className="text-center">
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="false"
            ></span>
            <span>{pending}</span>
          </div>
        )}
        {error && <div className="text-center text-danger">{error}</div>}
        {projects && (
          <div id="ProjectListContent">
            {projects.map((project) => (
              <div className="card mb-2" key={project.id}>
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
