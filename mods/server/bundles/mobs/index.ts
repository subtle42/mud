import { ingest } from "..";

const items:any[] = []

ingest('.')
.then(res => {
    res.forEach((data: any) => items.push(data))
})