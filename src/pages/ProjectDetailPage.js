import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../AppContexts';

function ProjectDetailPage() {
  const auth = React.useContext(AuthContext);
  const { projectId } = useParams();
  const [state, setState] = useState({});
  const { pending, error, project } = state;

  useEffect(() => {
    if (!auth) {
      setState({ error: 'You are not logged in!' });
    } else {
      setState({ pending: 'Fetching project...' });
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          console.log('Projects loaded.');
          setState({ project: res.data });
        })
        .catch((err) => {
          console.error(err.message);
          setState({ error: err.message });
        });
    }
  }, [auth, projectId]);

  return (
    <main id="ProjectDetailsPage" className="container p-3">
      <h1 id="ProjectDetailsHeader" className="text-center">
        Project Details
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
        {project && (
          <div id="ProjectDetailsContent">
            <h2>{project.title}</h2>
            <div>{project.description}</div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ProjectDetailPage;
