const crypto = require('crypto-js');
const { AES, enc, SHA256 } = crypto;

const SECRET = '||thisIsSecret||';
const VALID_TIMESTAMP_GAP = 1000 * 60 * 60 * 5; // 5 minutes

const hashWithTimestamp = text => AES.encrypt(text + Date.now(), SECRET).toString();

const hashWithoutTimestamp = text => SHA256(text + SECRET).toString();

const dehash = hashed => {
  const dehashed = AES.decrypt(hashed, SECRET).toString(enc.Utf8);
  const timestamp = dehashed.slice(dehashed.length - 13, dehashed.length);
  const password = dehashed.slice(0, dehashed.length - 13);

  return { password, timestamp };
}

const validateTimestamp = timestamp => Date.now() - timestamp < VALID_TIMESTAMP_GAP;

const main = () => {
  const password = 'Passw0rd!';

  console.log('hashed ', hashWithTimestamp(password));

  console.log('dehashed ', dehash(hashWithTimestamp(password)));

  console.log('rehashed ', hashWithoutTimestamp(dehash(hashWithTimestamp(password)).password));
}

main();