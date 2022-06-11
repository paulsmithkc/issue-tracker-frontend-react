import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function ProjectDetailPage() {
  const { projectId } = useParams();
  const [state, setState] = useState({});
  const { pending, error, project } = state;

  useEffect(() => {
    setState({ pending: 'Fetching project...' });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/project/${projectId}`)
      .then((res) => {
        console.log('Projects loaded.');
        setState({ project: res.data });
      })
      .catch((err) => {
        console.error(err.message);
        setState({ error: err.message });
      });
  }, [projectId]);

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
