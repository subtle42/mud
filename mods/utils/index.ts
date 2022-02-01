interface Pipe {
    <T>():T
    <T,A>(
        op1:(input:T)=>A
    ): (input:T) =>A
    <T,A,B>(
        op1:(input:T)=>A,
        op2:(input:A)=>B,
    ): (input:T) => B
    <T,A,B,C>(
        op1:(input:T)=>A,
        op2:(input:A)=>B,
        op3:(input:B)=>C,
    ): (input:T) => C
    <T,A,B,C,D>(
        op1:(input:T)=>A,
        op2:(input:A)=>B,
        op3:(input:B)=>C,
        op4:(input:C)=>D,
    ): (input:T) => D
    <T,A,B,C,D,E>(
        op1:(input:T)=>A,
        op2:(input:A)=>B,
        op3:(input:B)=>C,
        op4:(input:C)=>D,
        op5:(input:D)=>E,
    ): (input:T) => E
    <T,A,B,C,D,E,F>(
        op1:(input:T)=>A,
        op2:(input:A)=>B,
        op3:(input:B)=>C,
        op4:(input:C)=>D,
        op5:(input:D)=>E,
        op6:(input:E)=>F,
    ): (input:T) => F
}

export const pipe: Pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

interface Strategy {
    <T,A>(strat:{[key:string]: (var1:A)=>T}): (name:string) => (var1:A) => T
    <T,A,B>(strat:{[key:string]: (var1:A, var2:B)=>T}): (name:string) => (var1:A, var2:B) => T
    <T,A,B,C>(strat:{[key:string]: (var1:A, var2:B, var3:C)=>T}): (name:string) => (var1:A, var2:B, var3:C) => T
}

export const buildStrategy: Strategy = strat => name => {
    if (!strat[name]) throw new Error(`Cannot find method: ${name}`)
    return (...a) => strat[name](...a)
}
