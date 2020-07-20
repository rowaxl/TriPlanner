import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8000/user'
});

export const callSignIn = async (id, hashedPassword) => {
  // TODO: Change it
  const res = await instance.post('/signin',
    { id, hashedPassword }
  ).catch(e => console.error(e));

  if (!res || res.status !== 200) {
    return null;
  }

  return res.data;
};

export const callSignup = async (id, name, hashedPassword, role) => {
  const res = await instance.post('/signup', { id, name, hashedPassword, role }).catch(e => console.error(e));

  if (res.status !== 201) {
    return null;
  }

  return res;
};

export const callGetUserDetail = async (accessToken, id) => {
  const res = await instance.get('/' + id, { headers: { 'access-token': accessToken } });

  if (res.status !== 200) {
    return null;
  }

  return res.data;
}

export const getUsers = async (accessToken) => {
  const res = await instance.get('/', { headers: { 'access-token': accessToken } });

  if (res.status !== 200) {
    return null;
  }

  return res.data;
}

export const updateUser = async (accessToken, userDetail) => {
  const res = await instance.put('/' + userDetail.id, userDetail, {
    headers: { 'access-token': accessToken }
  });

  if (res.status !== 200) {
    return null;
  }

  return res.data;
}

export const deleteUser = async (accessToken, id) => {
  const res = await instance.delete('/' + id, {
    headers: { 'access-token': accessToken }
  });

  if (res.status !== 204) {
    return null;
  }

  return res;
}
