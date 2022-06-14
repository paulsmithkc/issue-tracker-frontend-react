import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../AppContexts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Unauthenticated } from '../components/Unauthenticated';
import { getProjectById, getProjectIssues } from '../AppAPI';

function ProjectDetailPage() {
  const auth = useContext(AuthContext);
  const { projectId } = useParams();
  const [projectState, setProjectState] = useState({});
  const [issueState, setIssueState] = useState({});

  useEffect(() => {
    if (!auth) {
      setProjectState({});
      setIssueState({});
    } else {
      setProjectState({ pending: 'Fetching project...' });
      setIssueState({ pending: 'Fetching issues...' });
      getProjectById(auth, projectId)
        .then((res) => {
          console.log(`Project ${projectId} loaded.`);
          setProjectState({ data: res.data });
        })
        .catch((err) => {
          const errorMessage = err?.response?.data?.message || err.message;
          console.error(errorMessage);
          setProjectState({ error: errorMessage });
        });
      getProjectIssues(auth, projectId)
        .then((res) => {
          console.log(`Issues loaded for project ${projectId}.`);
          setIssueState({ data: res.data });
        })
        .catch((err) => {
          const errorMessage = err?.response?.data?.message || err.message;
          console.error(errorMessage);
          setIssueState({ error: errorMessage });
        });
    }
  }, [auth, projectId]);

  return (
    <main id="ProjectDetailsPage" className="container p-3">
      <h1 id="ProjectDetailsHeader" className="text-center">
        Project Details
      </h1>
      <div>
        <Breadcrumbs
          stack={[{ title: 'Projects', url: '/project/list' }]}
          current={projectState?.data?.title || projectId}
        />
      </div>
      {!auth && <Unauthenticated />}
      {auth && (
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
              <div className="text-center text-danger">
                {projectState.error}
              </div>
            )}
            {projectState.data && (
              <div id="ProjectDetailsContent">
                <h2>
                  <span>{projectState.data.title}</span>
                  {projectState.data.priority && (
                    <span className="badge bg-primary mx-2">
                      {projectState.data.priority}
                    </span>
                  )}
                </h2>
                {projectState.data.createdOn && (
                  <div className="mb-1 fst-italic text-muted">
                    {'Created by ' +
                      projectState.data?.createdBy.email +
                      ' on ' +
                      moment(projectState.data.createdOn).format('LL')}
                  </div>
                )}
                {projectState.data.lastUpdatedOn && (
                  <div className="mb-1 fst-italic text-muted">
                    {'Last updated by ' +
                      projectState.data?.lastUpdatedBy.email +
                      ' on ' +
                      moment(projectState.data.lastUpdatedOn).format('LL')}
                  </div>
                )}
                <div>{projectState.data.description}</div>
              </div>
            )}
          </div>
        </div>
      )}
      {auth && (
        <div className="text-center mb-2">
          <Link
            className="btn btn-primary"
            to={`/project/${projectId}/issue/new`}
          >
            Create Issue
          </Link>
        </div>
      )}
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
        {issueState.data && (
          <div className="row mx-1">
            {issueState.data.map((issue) => (
              <div className="col-lg-6" key={issue.id}>
                <div className="card mb-1">
                  <div className="card-body">
                    <div className="card-title h4">
                      <Link
                        to={`/project/${issue.projectId}/issue/${issue.id}`}
                      >
                        {issue.title}
                      </Link>
                      {issue.priority && (
                        <span className="badge bg-primary mx-2">
                          {issue.priority}
                        </span>
                      )}
                    </div>
                    {issue.createdOn && (
                      <div className="mb-1 fst-italic text-muted">
                        {'Created by ' +
                          issue.createdBy?.email +
                          ' on ' +
                          moment(issue.createdOn).format('LL')}
                      </div>
                    )}
                    {issue.lastUpdatedOn && (
                      <div className="mb-1 fst-italic text-muted">
                        {'Last updated by ' +
                          issue.lastUpdatedBy?.email +
                          ' on ' +
                          moment(issue.lastUpdatedOn).format('LL')}
                      </div>
                    )}
                    <div className="card-text">{issue.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ProjectDetailPage;
