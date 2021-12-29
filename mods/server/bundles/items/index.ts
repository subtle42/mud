import { ingest } from "..";
import { buildCmd } from "../../cmds";

let items: Item[] = []
interface Item {
    name: string
    desc: string
    weight?: number
}


ingest('.')
.then(data => items = data as any)

export const getItem = (name: string): Item | undefined  => {
    return items.find(x => x.name === name)
}
