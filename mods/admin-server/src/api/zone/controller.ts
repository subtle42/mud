import * as fs from 'fs'
import * as path from 'path'
import { Request, Response} from 'express'
import { validate } from 'jsonschema'

import { ZoneSchema } from './model'
const DATA_LOC = `../data`

const doesFileExist = (name: string):Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.readdir(DATA_LOC, (err, files) => {
            if (err) return reject(err)
            const toFind = files.find(f => {
                return f === `${name}.yml`
            })
            resolve(!!toFind)
        })
    })
}

const writeFile = (name: string):Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(DATA_LOC, `${name}.yml`), '', (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

export const getOne = (req: Request, res: Response) => {
    res.json('in get one')
}

const listZones = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        fs.readdir(DATA_LOC, (err, files) => {
            if (err) return reject(err)
            // List only YML files
            resolve(files.filter(f => f.includes(`.yml`)))
        })
    })
}

export const getAll = (req: Request, res: Response) => {
    listZones()
    .then(zones => res.json(zones))
    .catch(err => res.status(500).json(err))
    res.json('in get all')
}

export const create = (req: Request, res: Response) => {
    const toAdd = req.body
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
