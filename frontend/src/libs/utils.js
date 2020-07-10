import { AES, enc } from 'crypto-js';

const SECRET = '||thisIsSecret||';
export const hash = (text) => {
  console.log(text);
  const encrypted = AES.encrypt(text + Date.now(), SECRET);

  const decrypted = AES.decrypt(encrypted, SECRET).toString(enc.Utf8);
  console.log(decrypted.substring(0, decrypted.length - 13));
  console.log(decrypted.substring(decrypted.length - 13, decrypted.length));



};