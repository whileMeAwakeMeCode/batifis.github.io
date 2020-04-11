import React from 'react'
import { Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ListItem = (props) => {
    const {
        containerStyle,     // {object} : style for the main container
        title,              // center component / text
        titleStyle,         // style for title container
        subTitle,           // subtitle component / text
        subTitleStyle,      // style for subTitle
        contentStyle,       // title + subTitle style
        alignAll,           // {enum} 'left', 'center', 'right' : align text for all header containers
        leftElement,        // {element}
        rightElement,       // {element}
        headerProps,        // {object} any semantic ui header props
        spaceEvenly,        // {bool} will use flex to create the required containers (ex.: leftElement + title will create only 2 containers) 
        // leftContainerAlign,       // {enum} 'left', 'center', 'right' : align text for left container
        // centerContainerAlign,     // {enum} 'left', 'center', 'right' : align text for center container
        // rightContainerAlign,      // {enum} 'left', 'center', 'right' : align text for right container
    } = props;

    const containersToCreate = [0, "leftElement", "rightElement", "title"].reduce((a, b) => props[b] ? a + 1 : a)
    console.log('containersToCreate', containersToCreate)   // 2

    const flex = spaceEvenly && 1 / containersToCreate
    console.log('flex', flex)                               // .5

    const rowContainersStyle = (alignProp) => ({flex: flex || .33, textAlign: (alignAll || typeof alignProp !== 'undefined') && alignAll || (props[`${alignProp}ContainerAlign`] || 'center'), justifyContent: 'center', alignItems: 'center'})
    
    const ItemHeader = () => <div style={rowContainersStyle('center')}>
        <Header
            style={contentStyle}
            content={<div style={titleStyle}>{title}</div>}
            subheader={<div style={subTitleStyle}>{subTitle}</div>}
            {...headerProps}
        />
    </div>

    const firstBlockCondition = spaceEvenly && leftElement

    return <div className="flexCenter row" style={containerStyle}>
        {
            !spaceEvenly || firstBlockCondition 
            ? <div style={rowContainersStyle('left')}>
                {
                    leftElement || (spaceEvenly && <ItemHeader />)
                }
            </div>
            : null
        }
        {
            !spaceEvenly || leftElement || containersToCreate > 1
            ? <ItemHeader />
            : null
        }
        {
            !spaceEvenly || rightElement || containersToCreate > 2
            ? <div style={rowContainersStyle('right')}>
                {rightElement}
            </div>
            : null
        }

    </div>
}

export default ListItem

ListItem.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.oneOfType([
        PropTypes.string,           // string 
        PropTypes.elementType,      // react element
    ]),
    subTitle: PropTypes.oneOfType([
        PropTypes.string,           // string 
        PropTypes.elementType,      // react element
    ]),
    titleStyle: PropTypes.object,
    subTitleStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    alignAll: PropTypes.string,
    leftElement: PropTypes.oneOfType([
        PropTypes.string,           // string 
        PropTypes.elementType,      // react element
    ]),
    rightElement: PropTypes.oneOfType([
        PropTypes.string,           // string 
        PropTypes.elementType,      // react element
    ]),
    headerProps: PropTypes.object,
    leftContainerAlign: PropTypes.string,
    centerContainerAlign: PropTypes.string,
    rightContainerAlign: PropTypes.string,
    spaceEvenly: PropTypes.bool
}
