import { createLogger, format, transport, transports } from "winston";


export const logger = createLogger({
    level: 'critical',
    format: format.json(),
    transports: [
        new transports.Console()
    ]
})