import { buildCmd, getCmdsInSchool } from "../../cmds";

const SCHOOLS = {
    survival: 'Survival'
}


const getMySkillSchools = () => {
    return [`all the skills`,
    `class skills`,
    `survival`]
}

const getDivider = ():string => {
    return `<div style="color:green">
        ----------------------------------------
    </div>`
}

const getSkillsInSchool = (school: string) => {
    const cmds = getCmdsInSchool(school)
    if (cmds.length === 0) {
        return `<div style="color:red">Unable to find school: ${school}</div>`
    }
    return [
        `<div style="color:yellow">Abilities in ${school.toLocaleUpperCase()}</div>`,
        ...(cmds.map(c => `${c.name}: ${c.desc}`))
    ]
}

const getCmdInfo = (cmd: string, school: string): string[] | string => {
    const cmds = getCmdsInSchool(school)
    if (cmds.length === 0) {
        return `<div style="color:red">Unable to find school: ${school}</div>`
    }
    const cmdInfo = cmds.find(c => c.name === cmd)
    if (!cmdInfo) {
        return `<div style="color:red">Unable to find cmd: ${cmd} in school: ${school}</div>`
    }
    return [
        `<div style="color:yellow">${cmdInfo.name} (${school})</div>`,
        getDivider(),
        `Syntax: ${cmdInfo.name} ${cmdInfo.options.map(o => `[${o.name}]`).join(' ')}`,
        `Works On: `,
        `Cooldown: 3`,
        `Details: ${cmdInfo.desc}`,
        getDivider()
    ]
}

buildCmd('skill', {
    alias: 'sk'
})
.option('school', {
    desc: 'the school of skills you wish to learn about'
})
.option('skill', {
    desc: 'the invidivual skill you wish to learn about'
})
.handler((inputs, socket) => {
    const {skill, school} = inputs
    if (!skill && !school) {
        return socket.respond(getMySkillSchools().join(' '))
    }
    else if (!skill && school) {
        return socket.respond(getSkillsInSchool(inputs.school as string))
    } else if (skill && school) {
        socket.respond(getCmdInfo(inputs.skill as string, inputs.school as string))
    }
})

buildCmd('swim', {
    school: SCHOOLS.survival,
    desc: 'You will try to swim'
})
.option('direction', {
    validateFn: val => true,
    demand: true
})
.handler((inputs, socket) => {
    socket.respond(`swimming toward the ${inputs.direction}`)
})

buildCmd('climb', {
    school: SCHOOLS.survival,
    desc: 'You will try to climb'
})
.option('direction', {
    validateFn: val => true,
    demand: true
})
.handler((inputs, socket) => {
    socket.respond(`climbing toward ${inputs.direction}`)
})