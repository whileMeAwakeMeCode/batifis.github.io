import React, {useState, useEffect} from 'react'
import {Progress} from 'semantic-ui-react'

const AutoProgressBar = (props) => {
    let [progress, setProgress] = useState(0)

    useEffect(() => {
        if (progress < 100) {
            setTimeout(() => {
                setProgress(props.end ? 100 : progress >= 90 ? 90 : progress + 1)
            }, 50)
        }
    })

    return <Progress
        //warning={progress < 100}
        indicating={props.autoColors}
        percent={progress}
        color='green'
    />
}

export default AutoProgressBar