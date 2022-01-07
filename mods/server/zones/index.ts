import io from 'socket.io'


interface buildArgs {
    mob: () => void,
    map: () => void,
    room: (name: string) => ({name: string, connect: (input:string) => void})
}

interface Mob {
    name: string
    spawn: {
        count: number
        
    }
}

const buildMob = () => {}

const buildMap = () => {}
const buildRoom = (name: string) => {
    return {
        name,
        connect: (toConnect: string) => {

        }
    }
}


export const createZone = (build: (args:buildArgs)=>void) => {
    const server = new io.Server({
        allowRequest: (req, callback) => {
            callback(null, true);
        },
        cors: {
            origin: "http://localhost:9000",
            methods: ["GET", "POST"]
        }
    })

    build({
        mob: buildMob,
        map: buildMap,
        room: buildRoom
    })


    return server
}

createZone(args => {
    args.mob()
    const room1 = args.room('test')
    .connect('')
})