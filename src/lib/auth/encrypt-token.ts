import { createCipheriv, createDecipheriv, randomBytes} from 'node:crypto'

const key = Buffer.from(process.env.REFRESH_ENCRYPTION_KEY!, 'hex')

export function encryptToken(token:string){
    const iv = randomBytes(12)
    const cipher = createCipheriv('aes-256-gcm', key, iv)
    const encrypted = Buffer.concat([cipher.update(token,'utf-8'), cipher.final()])
    const tag = cipher.getAuthTag()

    return Buffer.concat([iv, tag, encrypted]).toString('base64')
}


export function decryptToken(value: string){
    const data = Buffer.from(value, 'base64')
    const iv = data.subarray(0,12)
    const tag = data.subarray(12, 28)
    const encrypted = data.subarray(28)
    const decipher = createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(tag)

    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}