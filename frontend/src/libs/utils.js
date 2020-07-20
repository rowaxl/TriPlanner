import { AES } from 'crypto-js';

const SECRET = '||thisIsSecret||';
export const hash = (text) => AES.encrypt(text + Date.now(), SECRET).toString();

export const convertToDay = (millisec) => parseInt(millisec / (1000 * 3600 * 24));

export const USER_ROLE = {
  USER: 1,
  ADMIN: 2,
  MANAGER: 3
};
