import { readFile } from 'fs/promises'
import { validate } from 'jsonschema'
import { parse } from 'yamljs'


export const ingest = (filepath: string): Promise<any> => {
    return Promise.all([
        readFile(`${filepath}/data.yml`, 'utf-8'),
        readFile(`${filepath}/schema.yml`, 'utf-8')
    ])
    .then(([data, schema]) => {
        data = parse(data)
        schema = parse(schema)
        const results = validate(data, schema)
        if (!results.valid) {
            return Promise.reject(results.errors)
        }
        return data
    })
    .catch(err => console.error(err))
}

export const handleError = (msg: string, ack: Function): void => {
    ack(`<div style="color:red">${msg}</div>`)
}