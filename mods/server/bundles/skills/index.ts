import { buildCmd } from "../../cmds";

const SCHOOLS = {
    survival: 'Survival'
}


const getMySkillSchools = () => {
    return [`all the skills`,
    `class skills`,
    `survival`]
}

buildCmd('skill', {
    alias: 'sk'
}, args => {
    args.option('school', {
        type: 'string',
        desc: 'the school of skills you wish to learn about'
    })
    .option('skill', {
        type: 'string',
        desc: 'the invidivual skill you wish to learn about'
    })
}, (inputs, ack) => {
    if (!inputs.skill && !inputs.school) return ack(getMySkillSchools())
})

buildCmd('swim', {
    school: SCHOOLS.survival
}, args => {
    args.option('direction', {
        validator: val => true
    })
}, (inputs, ack) => {
    ack(`swimming toward the ${inputs.direction}`)
})