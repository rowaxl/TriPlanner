import { AES, enc, SHA256 } from 'crypto-js';
import jwt from 'jsonwebtoken';

const SECRET = '||thisIsSecret||';
const JWTKEY = 'ThisIsJWTSecret';

const VALID_TIMESTAMP_GAP = 1000 * 60 * 5; // 5 Minutes

export const USER_ROLE = {
  USER: 1,
  ADMIN: 2,
  MANAGER: 3
};

export const hashWithTimestamp = text => AES.encrypt(text + Date.now(), SECRET).toString();

export const hashWithoutTimestamp = text => SHA256(text + SECRET).toString();

export const dehash = hashed => {
  const dehashed = AES.decrypt(hashed, SECRET).toString(enc.Utf8);
  const timestamp = dehashed.slice(dehashed.length - 13, dehashed.length);
  const dehahsedPassword = dehashed.slice(0, dehashed.length - 13);

  return { dehahsedPassword, timestamp };
}

export const validateTimestamp = timestamp => Date.now() - timestamp < VALID_TIMESTAMP_GAP;

export const generateUserToken = userDetail =>
  jwt.sign(userDetail, JWTKEY, {
    algorithm: 'HS256',
    expiresIn: '1d'
  });

export const validateToken = token => {
  try {
    const { _id, exp } = jwt.verify(token, JWTKEY);

    if (!_id || !exp) {
      return null;
    }

    const expired = exp * 1000;

    if (expired < Date.now()) {
      return null;
    }

    return _id;
  } catch (e) {
    return null;
  }
}
