import axios from 'axios'
import { dispatch, store } from '../store'

axios.defaults.baseURL = `http://localhost:3000/`

export const createZone = (name: string): Promise<void> => {
    return axios.post('/zone', {
        name
    }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const getZoneList = (): Promise<void> => {
    return axios.get(`zone`)
    .then(res => store.dispatch(() => dispatch.zone.setAll(res.data)))
    .then(() => undefined)
}