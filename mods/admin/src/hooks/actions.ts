import axios from 'axios'

axios.defaults.baseURL = `http://localhost:3000`

export const zone = {
    create: (name: string): Promise<void> => {
        return axios.post('/zone', {
            name
        })
    },
    getAll: (): Promise<any[]> => {
        return axios.get(`/zone/all`)
        .then(res => res.data)
    },
    remove: (name: string): Promise<void> => {
        return axios.delete(`/zone/${name}`)
        .then(() => undefined)
    }
}