import { AES, enc } from 'crypto-js';

const SECRET = '||thisIsSecret||';
export const hash = (text) => {
  // const encrypted = AES.encrypt(text + Date.now(), SECRET);
  const encrypted = AES.encrypt(text + 1594421983403, SECRET);

  return AES.decrypt(encrypted, SECRET).toString(enc.Utf8);
};

export const convertToDay = (millisec) => parseInt(millisec / (1000 * 3600 * 24));
