import axios from 'axios'

export const createZone = (data): Promise<void> => {
    return axios.post('http://localhost:3000/zone', {
        name: 'teawkljawfe'
    }, {
        headers: {
            'content-type': 'application/json'
        }
    })
}