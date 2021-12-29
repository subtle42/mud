import * as React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

interface Props {
    style?: React.CSSProperties
}

export const StatusBarsComponent: React.FunctionComponent<Props> = (props) => {
    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <ProgressBar style={{width: '100%'}} now={2} variant="danger" label={<span style={{color: 'black',minWidth: 100}}>Health</span>} />
        <ProgressBar style={{width: '100%'}} now={75} label="Mana" />
        <ProgressBar style={{width: '100%'}} now={75} variant="warning" label="Stamina" />
    </div>
}