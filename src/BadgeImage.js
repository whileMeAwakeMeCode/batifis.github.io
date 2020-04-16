import React from 'react'
import Colors from './constants/Colors'
import { Icon, Image } from 'semantic-ui-react'

/**
 * 
 * @param {object} props 
 *  - source {string} : image source
 *  - className {string} : image inline class
 *  - badgeName {enum} : a semantic-ui-react valid icon name (default: 'close')
 *  - imageStyle {object} : a stylesheet for image
 *  - imageSize {object} : {height, width, maxWidth} (default: height: '30vw', width: 'auto', maxWidth: '45vw') (will overwrite provided imageStyle)
 *  - resizeMode {enum} : image resize mode (default: 'contain') (will overwrite provided imageStyle)
 *  - badgeContainerStyle {object} : stylsheet for badge wrapper
 *  - onBadgeClick {function} : a callback to execute when badge icon is clicked
 *  - containerStyle {object} : a stylesheet for BadgeImage wrapper
 *  - shadow {bool} : set a shadow on container (default: true)
 *  - badgeMarginRight
 *  - bacdgeMarginTop
 */
const BadgeImage = (props) => {
    const {source, badgeName, imageSize, imageStyle, onBadgeClick, resizeMode, containerStyle, className, shadow, badgeContainerStyle, badgeMarginTop, badgeMarginRight} = props

    const badgeClick = () => typeof onBadgeClick === 'function' && onBadgeClick()

    return <div 
        className={shadow === false ? "" : "shadow"}
        style={containerStyle || {padding: 10, margin: 20, border: `solid 1px ${Colors.anthracite}`, borderRadius: 10, backgroundColor: Colors.white}}
    >
        <span className="clickable" style={{...(badgeContainerStyle || {}), display: 'flex', flex: '1', justifyContent: 'flex-end', marginTop: badgeMarginTop||-25, marginRight: badgeMarginRight||-25}} onClick={badgeClick}>
            <Icon circular inverted color="blue" name={badgeName || "close"} />
        </span>
        <Image className={className} src={source} style={{...(imageStyle || {}), ...(imageSize || {height: '30vh', width: 'auto', maxWidth: '45vw'}), objectFit: resizeMode || 'contain', borderRadius: 5}} />
    </div>
}

export default BadgeImage