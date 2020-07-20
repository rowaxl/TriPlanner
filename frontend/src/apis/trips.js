import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8000/trip'
});

export const postNewTrip = async (accessToken, tripDetail) => {
  const result = await instance.post('/', tripDetail, {
    headers: { 'access-token': accessToken }
  });

  return result;
}

export const getTrips = async (accessToken, type) => {
  const trips = await instance.get('/?type=' + type, {
    headers: { 'access-token': accessToken }
  });

  return trips.data;
};

export const browseTrip = async (accessToken) => {
  const trips = await instance.get('/browse', {
    headers: { 'access-token': accessToken }
  });

  return trips.data;
}

export const getDestinations = async (accessToken) => {
  const destinations = await instance.get('/destinations', {
    headers: { 'access-token': accessToken }
  });

  return destinations.data;
};

export const deleteTrip = async (accessToken, tripId) => {
  const result = await instance.delete('/' + tripId, {
    headers: { 'access-token': accessToken }
  });

  if (result.status !== 204) {
    return null;
  }

  return result.data;
}

export const updateTrip = async (accessToken, tripDetail) => {
  const result = await instance.put('/' + tripDetail.id, tripDetail, {
    headers: { 'access-token': accessToken }
  });

  return result;
}