import { Schema } from "jsonschema";

export const ZoneSchema: Schema = {
    id: '/Zone',
    type: 'object',
    properties: {
        name: { type: 'string' }
    },
    required: ['name']
}

export interface ZoneModel {
    name: string
}