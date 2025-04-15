import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken.trim()}` : null;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (blogObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const update = async (id, blogObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (id, comment) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );
  return response.data;
};

export default {
  setToken,
  getAll,
  getById,
  create,
  update,
  remove,
  addComment,
};
