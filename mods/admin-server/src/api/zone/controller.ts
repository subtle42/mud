import * as fs from 'fs'
import * as path from 'path'
import { Request, Response} from 'express'
import { validate } from 'jsonschema'

import { ZoneSchema } from './model'
import { DATA_LOC } from '../../util'


const doesFileExist = (name: string):Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.readdir(DATA_LOC, (err, files) => {
            if (err) return reject(err)
            const toFind = files.find(f => {
                console.log('filename', f)
                return f === name
            })
            resolve(!!toFind)
        })
    })
}

const writeFile = (name: string):Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(DATA_LOC, name), '', (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

export const getOne = (req: Request, res: Response) => {
    res.json('in get one')
}

export const getAll = (req: Request, res: Response) => {
    res.json('in get all')
}

export const create = (req: Request, res: Response) => {
    const toAdd = req.body
    console.log('name', toAdd)
    const validRes = validate(toAdd, ZoneSchema)
    if (!validRes.valid) return res.status(500).json(validRes.errors)

    doesFileExist(toAdd.name)
    .then(fileExists => {
        if (fileExists) return Promise.reject({
            message: `${toAdd.name}: this zone already exists`
        })
        return writeFile(toAdd.name)
    })
    .then(() => res.json('done'))
    .catch(err => res.status(500).json(err))
}

export const update = (req: Request, res: Response) => {}

export const remove = (req: Request, res: Response) => {}