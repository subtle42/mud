import { createLogger, format, transport, transports } from "winston";


export const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        new transports.Console()
    ]
})