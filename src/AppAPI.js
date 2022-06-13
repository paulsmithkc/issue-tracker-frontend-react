import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function login(data) {
  return axios.post(`${apiUrl}/api/auth/login`, data);
}

export function register(data) {
  return axios.post(`${apiUrl}/api/auth/register`, data);
}

export function getProjectList(auth) {
  return axios.get(`${apiUrl}/api/project/list`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
}

export function getProjectById(auth, projectId) {
  return axios.get(`${apiUrl}/api/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
}

export function getProjectIssues(auth, projectId) {
  return axios.get(`${apiUrl}/api/project/${projectId}/issue/list`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
}

export function getIssueById(auth, projectId, issueId) {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/api/project/${projectId}/issue/${issueId}`,
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  );
}

export function getIssueComments(auth, projectId, issueId) {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/api/project/${projectId}/issue/${issueId}/comment/list`,
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  );
}
