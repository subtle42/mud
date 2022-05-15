import { Request, Response, Router } from 'express'
import * as fs from 'fs'
import * as yaml from 'js-yaml'
import { validate, Schema } from 'jsonschema'


const schema:Schema = {
    id: '/Quest',
    type: 'object',
    properties: {
        name: { type: 'string' },
    },
    required: []
}

const getFile = (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

const writeFile = (path: string, data: any): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, err => {
            if (err) return reject(err)
            resolve()
        })
    })
}

export const create = async(req: Request, res: Response) => {
    const data = req.body
    const myFile = await getFile('')
    const fileData: any[] = await yaml.load(myFile) as any
    const validResult = validate(data, schema)
    if (!validResult.valid) {
        return res.status(500).json(validResult.errors)
    }
    fileData.push(data)
    await writeFile('', data)
    res.json()
}

const getAll = (req: Request, res: Response) => {
    const {zone} = req.params
}

export const router = Router()

router.post('/', create)
