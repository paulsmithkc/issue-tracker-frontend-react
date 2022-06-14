import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AppContexts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { IssueCommentForm } from '../components/IssueCommentForm';
import { getIssueById, getIssueComments } from '../AppAPI';

function IssueDetailPage() {
  const auth = useContext(AuthContext);
  const { projectId, issueId } = useParams();
  const [issueState, setIssueState] = useState({});
  const [commentState, setCommentState] = useState({});

  useEffect(() => {
    if (!auth) {
      setIssueState({ error: 'You are not logged in!' });
      setCommentState({});
    } else {
      setIssueState({ pending: 'Fetching issue...' });
      setCommentState({ pending: 'Fetching comments...' });
      getIssueById(auth, projectId, issueId)
        .then((res) => {
          console.log(`Issue ${issueId} loaded.`);
          setIssueState({ data: res.data });
        })
        .catch((err) => {
          const errorMessage = err?.response?.data?.message || err.message;
          console.error(errorMessage);
          setIssueState({ error: errorMessage });
        });
      getIssueComments(auth, projectId, issueId)
        .then((res) => {
          console.log(`Comments loaded for issue ${issueId}.`);
          setCommentState({ data: res.data });
        })
        .catch((err) => {
          const errorMessage = err?.response?.data?.message || err.message;
          console.error(errorMessage);
          setCommentState({ error: errorMessage });
        });
    }
  }, [auth, projectId, issueId]);

  function onPostComment(newComment) {
    const commentData = commentState.data
      ? [...commentState.data, newComment]
      : [newComment];
    setCommentState({ data: commentData });
  }

  return (
    <main id="IssueDetailsPage" className="container p-3">
      <h1 id="IssueDetailsHeader" className="text-center">
        Issue Details
      </h1>
      <div>
        <Breadcrumbs
          stack={[
            { title: 'Projects', url: '/project/list' },
            { title: 'Project', url: `/project/${projectId}` },
          ]}
          current={issueState?.data?.title || issueId}
        />
      </div>
      <div className="card mb-3">
        <div className="card-body">
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
            <div id="IssueDetailsContent">
              <h2>
                <span>{issueState.data.title}</span>
                {issueState.data.priority && (
                  <span className="badge bg-primary mx-2">
                    {issueState.data.priority}
                  </span>
                )}
              </h2>
              {issueState.data.createdOn && (
                <div className="mb-1 fst-italic text-muted">
                  {'Created by ' +
                    issueState.data.createdBy?.email +
                    ' on ' +
                    moment(issueState.data.createdOn).format('LL')}
                </div>
              )}
              {issueState.data.lastUpdatedOn && (
                <div className="mb-1 fst-italic text-muted">
                  {'Last updated by ' +
                    issueState.data.lastUpdatedBy?.email +
                    ' on ' +
                    moment(issueState.data.lastUpdatedOn).format('LL')}
                </div>
              )}
              <div>{issueState.data.description}</div>
            </div>
          )}
        </div>
      </div>
      <div>
        {commentState.pending && (
          <div className="text-center">
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="false"
            ></span>
            <span>{commentState.pending}</span>
          </div>
        )}
        {commentState.error && (
          <div className="text-center text-danger">{commentState.error}</div>
        )}
        {commentState.data && (
          <div className="mx-2">
            {commentState.data.map((comment) => (
              <div className="card mb-1" key={comment.id}>
                <div className="card-body">
                  <div className="mb-1 fst-italic text-muted">
                    {'Posted by ' +
                      comment.createdBy.email +
                      ', ' +
                      moment(comment.createdOn).fromNow()}
                  </div>
                  <div className="card-text">{comment.text}</div>
                </div>
              </div>
            ))}
            <IssueCommentForm onPostComment={onPostComment} />
          </div>
        )}
      </div>
    </main>
  );
}

export default IssueDetailPage;
