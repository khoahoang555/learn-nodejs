import { createHash } from 'crypto'
import * as process from 'process'
import { config } from 'dotenv'
config()

export function sha256(content: string) {
  return createHash('sha3-256').update(content).digest('hex')
}

export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET)
}
