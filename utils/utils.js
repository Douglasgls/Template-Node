import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const SEGREDOJWTEXEMPLO  = "asjdb/ch"

async function hashPassword(password, saltRounds) {
    return await bcrypt.hash(password,saltRounds)
}

async function compareHash(password,hashPassword) {
    return await bcrypt.compare(password,hashPassword)
}

async function generatedToken(payload) {
    return jwt.sign(payload,SEGREDOJWTEXEMPLO,{expiresIn: "10m"})
}

async function validateToken(token) {
    return jwt.verify(token);
}

async function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, SEGREDOJWTEXEMPLO);
        return decoded // { userId: 123, iat: ..., exp: ... }
      } catch (err) {
        return null
      }
}

export default {
    hashPassword,
    compareHash,
    generatedToken,
    validateToken,
    decodeToken,
}