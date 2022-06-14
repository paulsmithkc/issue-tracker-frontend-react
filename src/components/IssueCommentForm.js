import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AppContexts';
import { createIssueComment } from '../AppAPI';

export function IssueCommentForm({ onPostComment }) {
  const auth = useContext(AuthContext);
  const { projectId, issueId } = useParams();
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  function onSubmit(evt) {
    evt.preventDefault();
    createIssueComment(auth, projectId, issueId, { text: commentText })
      .then((res) => {
        setCommentText('');
        setCommentError('');
        onPostComment(res.data.resource);
      })
      .catch((err) => {
        setCommentError(err?.response?.data?.message || err?.message);
      });
  }

  return (
    <form
      id="IssueCommentForm"
      className="mt-3"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <div className="mb-1">
        <label for="IssueCommentForm-TextInput" className="visually-hidden">
          Comment Text
        </label>
        <input
          id="IssueCommentForm-TextInput"
          className="form-control"
          type="text"
          name="text"
          placeholder="Enter comment..."
          value={commentText}
          onChange={(evt) => setCommentText(evt.currentTarget.value)}
        />
      </div>
      <div>
        <button
          id="IssueCommentForm-SubmitButton"
          className="btn btn-primary"
          onClick={onSubmit}
        >
          Post
        </button>
      </div>
    </form>
  );
}
