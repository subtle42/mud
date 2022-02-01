import * as React from 'react'

const getWindowDim = ():{x: number, y: number} => {
    return {
        x: window.innerWidth,
        y: window.innerHeight
    }
}

export const useWindowDim = (): {x: number, y: number} => {
    const [dims, setDims] = React.useState(getWindowDim())

    React.useEffect(() => {
        const handleResize = () => setDims(getWindowDim())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return dims
}

const calcSideWindow = (): number => {
    return (getWindowDim().y/2)-130
}

export const useSideWindowHeight = (): number => {
    const [height, setHeight] = React.useState(calcSideWindow())

    React.useEffect(() => {
        const handleResize = () => setHeight(calcSideWindow())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return height
}

