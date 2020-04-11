import React, {Component} from 'react'
import { Modal, Image, Loader, Button, Icon, Header } from 'semantic-ui-react'
/**
 * Props List : 
 *   - title : change default title
 *   - subtitle : add a 2nd title as h4 above message
 *   - message : (any) *required* message to display (/!\ method throws if no message is provided)
 *   - messageClass
 *   - messageStyle
 *   - icon : Icon name
 *   - iconSize: Icon size prop
 *   - iconStyle: Icon style prop
 *   - iconColor: Icon color prop
 *   - iconComponent: Provide an Icon component replacing default Icon component
 *   - stay : (bool) keep message open(stay time) 
 *   - maxStay : (number or string-number) close message in __ milliseconds (maximum stay time)
 *   - timedOutComponent : (any) display a component when timed out (prop "stay" needs to be a number in order for timedOutComponent to be display)
 *   - activityIndicator : display an animated loader
 *   - activityIndicatorText : display a text next to loader
 *   - closeButton : {bool} add a button to close message
 *   - closeText : {string} change default "Fermer" text for close button
 *   - styleSheet : style Object
 *   - size : (string) 'mini', 'tiny', 'small', 'large', 'fullscreen'
 *   - classAttribute : modal class attribute
 *   - imageSource
 *   - imageSize
 *   - closed : (bool) indicates if modal needs to be closed (default: false)
 *   - id : (string) sets an id for modal
 *   - onClickState : {Object} merge state while seting state when closeButton is clicked
 * 
 */
export default class Log extends Component {

    constructor() {
        super()
        this.state = {
            closed: false,                          // indicate if log must be closed or opened
            endMsg: undefined,                      // end message / close modal request
            timedOutComponent: undefined      // indicate that 'timedOutComponent' prop must be rendered
        }
    }

                                                     
    async componentDidMount() {                           /* Display message on mounting */     // exit:  this.setState({closed:true, endMsg: true})      
        var { stay, timedOutComponent, maxStay } = this.props
     
        if (!stay===true) {                                 // skip if modal must remain visible

            maxStay = parseInt(maxStay)                          // make sure we deal with numbers

            var exitTime = await Promise.resolve(                                // setTimeout exit time
                maxStay || 4000
            );
            
            let stateConfig = await Promise.resolve(                              // if timedOutComponent is provided, show the component via state setting
                timedOutComponent
                ? {timedOutComponent: timedOutComponent}
                : {closed:true, endMsg: true}
            )
           

            // setTimeout(() => {
            //     this.setState(stateConfig)
            // }, exitTime)
            this.timer(stateConfig, exitTime)
 
        }
           
    }

    timer = (config, exit) => {
        setTimeout(() => {
            this.setState(config)
        }, exit)
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    componentDidUpdate() {                          /* Define component update action */
        const {message, logMethod} = this.props
        const {closed, endMsg, timedOutComponent} = this.state
        if(message && closed && !endMsg)            // if message and closed prop and no endMsg request, open modal 
            this.setState({closed:false})
        else if(endMsg && message)                  // if endMsg request, close modal by passing an empty logConfig to App 
            logMethod({})

    }


    maybeShowButtons = () => {                      
        var { closeButton, onClickState, closeText } = this.props
        const { timedOutComponent } = this.state
        onClickState = onClickState || {}
        const _closeText = closeText || "Fermer";
        console.log('closeText', closeText)
        console.log('_closeText', _closeText)
        return(
            (closeButton || closeText) && !timedOutComponent
            ? <div className="centered" style={{marginBottom: 20}}>
                <Button color="grey" onClick={() => this.setState({endMsg:true, closed:true, ...onClickState})}>{_closeText}</Button>
            </div>
            : null
        )
    }

    maybeShowIcon = () => {
        const { icon, iconSize, iconStyle, iconColor, iconComponent } = this.props
        return(
            icon
            ? <Icon name={icon} size={iconSize} style={iconStyle} color={iconColor} />
            : (
                iconComponent || null
            )
        )
    }

    maybeShowLoader = () => {
        const { activityIndicator, activityIndicatorText } = this.props
        const { timedOutComponent } = this.state

        return(
            activityIndicator && !timedOutComponent
            ? <div className="ui bottom attached header"><Loader active>{activityIndicatorText}</Loader></div>  /* ISSUE : TODO : RAT : loader appears white */
            : null
        )
    }

    maybeImageModalCore = () => {
        const { imageSource, imageSize } = this.props
        const { timedOutComponent } = this.state

        return(
            timedOutComponent
            ||( 
            imageSource
            ? (
                <Modal.Content image>
                    <Image wrapped size={imageSize || 'medium'} src={imageSource} alt="" />
                    {this.messageCore()}
                </Modal.Content>
            ) : (
                <Modal.Content>
                    {this.messageCore()}
                </Modal.Content>
            ))
        )
    }

    messageCore = () => {
        const { subTitle, message, messageStyle, messageClass } = this.props
        return(
           
            <Modal.Content>
                <Header as="h3">{subTitle}</Header>
                <div className={messageClass} style={messageStyle}>{message}</div>
            </Modal.Content>
        )
    }


    render() { 
        const {title, size, styleSheet, closed, classAttribute, id} = this.props
        console.log('Log props on render', this.props)
        return(
            <Modal id={id} open={!closed && !this.state.closed} style={{...styleSheet}} size={size} className={classAttribute.concat(' tekotxtall')} >
                <Modal.Header>
                    {this.maybeShowIcon()}
                    {title}
                </Modal.Header>
                {this.maybeImageModalCore()}
                <div className="padded" />
                {this.maybeShowLoader()}
                <div className="padded" />
                {this.maybeShowButtons()}  
            </Modal>
        )
    }
}