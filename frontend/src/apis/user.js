import axios from 'axios';

export const callSignIn = async (id, hashedPassword) => {
  // TODO: Change it
  await dummyAsync();

  return { status: 200, accessToken: 'access-token' };
};

const dummyAsync = () => new Promise((resolve) => {
  setTimeout(resolve, 1000);
})