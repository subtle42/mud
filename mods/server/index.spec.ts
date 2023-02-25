import test, { Request }  from 'supertest'
import { App } from '.';

describe('testing base server', () => {
    let client: test.SuperTest<Request>;

    beforeAll(() => {
        client = test(App)
    })

    afterAll(() => {
    })

    it('should respond to a simple get', async() => {
        const res = await client.get('/')
        expect(res.status).toBe(200)
    })

    describe('auth', () => {
        it('should return a token on success', async() => {
            const res = await client.post('/auth')
                .send({username: 'dan'})
            expect(res.status).toEqual(200)
            expect(res.body.token).not.toBeUndefined()
        })
    })
})