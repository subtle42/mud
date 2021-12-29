import { readFile } from 'fs/promises'
import { validate, Validator } from 'jsonschema'
import { parse } from 'yamljs'




export const ingest = (data: string) => {
    Promise.all([
        readFile(`${data}/data.yml`, 'utf-8'),
        readFile(`${data}/schema.yml`, 'utf-8')
    ])
    .then(([data, schema]) => {
        data = parse(data)
        schema = parse(schema)
        const results = validate(data, schema)
        if (!results.valid) {
            return Promise.reject(results.errors)
        }
        console.log('schema is good')
    })
    .catch(err => console.error(err))
}


ingest('./items')