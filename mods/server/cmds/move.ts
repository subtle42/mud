import { buildCmd } from ".";


buildCmd('north', {
    alias: 'n'
}, () => {
    console.log('move north')
})

buildCmd('south', {
    alias: 's'
}, () => {
})

buildCmd('east', {
    alias: 'e'
}, () => {})

buildCmd('west', {
    alias: 'w'
}, () => {})

buildCmd('in', () => {})
buildCmd('out', () => {})
buildCmd('up', () => {})
buildCmd('down', () => {})
