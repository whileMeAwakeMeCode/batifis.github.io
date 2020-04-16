/* TODO : REBUILD AS A NORMAL */

import React from 'react'
import {Progress} from 'semantic-ui-react'
import Utils from '../constants/Utils'

/**
 * @dev #PROPS:
 *  - incrementation {number} number of milliseconds between progress updates (default: 50)
 *  - completed {bool} set progress to 100%
 */
class AutoProgressBar extends React.Component {
    defaultState = {
        incrementation: 50,
        completed: false,
        active: false,
        progress: 0
    }

    state = this.defaultState

    componentDidMount() {
        const {incrementation: incremProp} = this.props
        const incrementation = incremProp || 50
        this.setState({incrementation})
    }

    componentDidUpdate() {
        const {completed: completedState, incrementation: incremState, active, progress} = this.state;
        const {completed, onCompleted, incrementation: incremProp, hide} = this.props;
        const incrementation = incremProp || incremState 

        if (!hide) {
            if (this.props.active && !active && progress < 1 && !completed) {
                this.setState({active: true})
            }
            else if (!completed && !completedState && active) {
                progress < 90 && setTimeout(() => {
                    let newProg = progress + 1
                    this.setState({progress: newProg > 90 ? 90 : newProg})
                }, incrementation);
            } else if (active && completed) {
                // is completed by still active
                this.setState({active: false, completed: true})
                typeof onCompleted === 'function' && onCompleted()
            }
        }

    }

    render() {
        const {progress, completed, active} = this.state
        const color = this.props.color === 'auto' ? null : this.props.color

        return (
            progress < 1 || this.props.hide
            ? null
            : <Progress
                active={active}
                key={Utils.keyExtractor()}
                indicating={!color}
                percent={completed ? 100 : progress}
                color={color}
            />
            
        )
    }
}



export default AutoProgressBar