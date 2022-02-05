
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const initVector = crypto.randomBytes(16);
const Securitykey = '12345678901234567890123456789012';
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

const message = "This is a secret message";
function enc(message) {
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData
}
const c = enc(message);
console.log(c)

function dec(encryptedData) {
  // the decipher function
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}
console.log(dec(c))

export {
  enc,
  dec
}
