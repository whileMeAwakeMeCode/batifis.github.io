import React, {useState, useEffect} from 'react'
import {Progress} from 'semantic-ui-react'

/**
 * 
 * @param {object} props
 *  #color {string} : enum color or 'auto' 
 *  #end {bool} : indicate success
 */
const AutoProgressBar = (props) => {
    let [progress, setProgress] = useState(0)
    const indicating = props.color && props.color === 'auto'
    const color = !indicating && props.color

    console.log('indicating', indicating)
    console.log('color', color)

    useEffect(() => {
        if (progress < 100) {
            setTimeout(() => {
                setProgress(props.end ? 100 : progress >= 90 ? 90 : progress + 1)
            }, 50)
        }
    })

    return <Progress
        //warning={progress < 100}
        indicating={indicating}
        percent={progress}
        color={color}
    />
}

export default AutoProgressBar