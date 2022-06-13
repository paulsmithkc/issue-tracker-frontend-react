import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../AppContexts';

function ProjectDetailPage() {
  const auth = useContext(AuthContext);
  const { projectId } = useParams();
  const [projectState, setProjectState] = useState({});
  const [issueState, setIssueState] = useState({});
  // const { pending, error, project } = projectState;

  useEffect(() => {
    if (!auth) {
      setProjectState({ error: 'You are not logged in!' });
      setIssueState({});
    } else {
      setProjectState({ pending: 'Fetching project...' });
      setIssueState({ pending: 'Fetching issues...' });
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          console.log(`Project ${projectId} loaded.`);
          setProjectState({ data: res.data });
        })
        .catch((err) => {
          console.error(err.message);
          setProjectState({ error: err.message });
        });
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/project/${projectId}/issue/list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        )
        .then((res) => {
          console.log(`Issues for project ${projectId} loaded.`);
          setIssueState({ data: res.data });
        })
        .catch((err) => {
          console.error(err.message);
          setIssueState({ error: err.message });
        });
    }
  }, [auth, projectId]);

  return (
    <main id="ProjectDetailsPage" className="container p-3">
      <h1 id="ProjectDetailsHeader" className="text-center">
        Project Details
      </h1>
      <div className="card mb-3">
        <div className="card-body">
          {projectState.pending && (
            <div className="text-center">
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="false"
              ></span>
              <span>{projectState.pending}</span>
            </div>
          )}
          {projectState.error && (
            <div className="text-center text-danger">{projectState.error}</div>
          )}
          {projectState.data && (
            <div id="ProjectDetailsContent">
              <h2>{projectState.data.title}</h2>
              <div>{projectState.data.description}</div>
            </div>
          )}
        </div>
      </div>
      <div>
        {issueState.pending && (
          <div className="text-center">
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="false"
            ></span>
            <span>{issueState.pending}</span>
          </div>
        )}
        {issueState.error && (
          <div className="text-center text-danger">{issueState.error}</div>
        )}
        {issueState.data &&
          issueState.data.map((issue) => (
            <div className="card mb-1 mx-2" key={issue.id}>
              <div className="card-body">
                <div className="card-title h4">
                  <Link to={`/project/${issue.projectId}/issue/${issue.id}`}>
                    {issue.title}
                  </Link>
                </div>
                <div className="card-text">{issue.description}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default ProjectDetailPage;
