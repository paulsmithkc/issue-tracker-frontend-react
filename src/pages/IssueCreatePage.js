import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Unauthenticated } from '../components/Unauthenticated';
import InputRow from '../components/InputRow';
import SubmitRow from '../components/SubmitRow';
import { AuthContext } from '../AppContexts';
import { createIssue } from '../AppAPI';

function ProjectCreatePage() {
  const auth = useContext(AuthContext);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const titleError = !title ? 'Title required.' : '';
  const descriptionError = !description ? 'Description required.' : '';
  const priorityError = ''; // priority is optional
  const anyErrors = titleError || descriptionError || priorityError;

  function onSubmit() {
    setSubmitted(true);

    if (anyErrors) {
      return Promise.reject({ message: 'Please fix errors above.' });
    } else {
      return createIssue(auth, projectId, { title, description, priority }).then((res) =>
        navigate(`/project/${projectId}/issue/${res.data.id}`)
      );
    }
  }

  return (
    <main id="IssueCreatePage" className="container p-3">
      <h1 id="IssueCreateHeader" className="text-center">
        Create Issue
      </h1>
      <div>
        <Breadcrumbs
          stack={[
            { title: 'Projects', url: '/project/list' },
            { title: 'Project', url: `/project/${projectId}` },
          ]}
          current="Create Issue"
        />
      </div>
      {!auth && <Unauthenticated />}
      {auth && (
        <div className="card mb-3">
          <div className="card-body">
            <form
              id="ProjectCreateForm"
              onSubmit={(evt) => evt.preventDefault()}
            >
              <InputRow
                label="Title"
                id="ProjectCreateForm-TitleInput"
                name="title"
                type="text"
                value={title}
                onChange={(evt) => setTitle(evt.currentTarget.value)}
                validated={submitted}
                error={titleError}
              />
              <InputRow
                label="Description"
                id="ProjectCreateForm-DescriptionInput"
                name="description"
                type="textarea"
                rows="5"
                value={description}
                onChange={(evt) => setDescription(evt.currentTarget.value)}
                validated={submitted}
                error={descriptionError}
              />
              <InputRow
                label="Priority"
                id="ProjectCreateForm-PriorityInput"
                name="description"
                type="text"
                value={priority}
                onChange={(evt) => setPriority(evt.currentTarget.value)}
                validated={priorityError}
                error={priorityError}
              />
              <SubmitRow onSubmit={onSubmit}>Create</SubmitRow>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProjectCreatePage;
