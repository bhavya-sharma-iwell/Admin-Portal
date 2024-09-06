import crypto from 'crypto'
import { ENCRYPTION_UTIL } from 'adminApp/constants'

export const EncryptData = (plainData) => {
	if(plainData && typeof plainData !== "object") {
	  const iv = Buffer.from(ENCRYPTION_UTIL.encryptionSecretKey, ENCRYPTION_UTIL.ENCODING)
	  const key = crypto.createHash('md5').update(ENCRYPTION_UTIL.encryptionSecretKey).digest()
	  const keys = crypto.createCipheriv(ENCRYPTION_UTIL.ALGO, key, iv)
	  let encryptedText = keys.update(plainData.toString(), ENCRYPTION_UTIL.ENCODING, ENCRYPTION_UTIL.DIGEST)
	  encryptedText += keys.final(ENCRYPTION_UTIL.DIGEST)
	  return encryptedText
	}
	return plainData
  }