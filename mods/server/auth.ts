import { sign, verify } from "jsonwebtoken"

const SECRET_KEY = 'dantheman'

export const decodeToken = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        verify(token, SECRET_KEY, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

export const createToken = (data: string | object): Promise<string> => {
    return new Promise((resolve, reject) => {
        sign(data, SECRET_KEY, (err, data) => {
            if (err) return reject(err)
            resolve(data || '')
        })
    })
}
