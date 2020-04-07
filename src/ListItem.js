import React from 'react'
import { Header } from 'semantic-ui-react'

const ListItem = (props) => {
    const {
        containerStyle,     // {object} : style for the main container
        title,              // center component / text
        titleStyle,         // style for title container
        subTitle,           // subtitle component / text
        subTitleStyle,
        contentStyle,       // title + subTitle style
        alignAll,           // {enum} 'left', 'center', 'right' : align text for all header containers
        leftElement,
        rightElement,
        headerProps,    // any semantic ui header props
        alignLeft,      // {enum} 'left', 'center', 'right' : align text for left container
        align,          // {enum} 'left', 'center', 'right' : align text for center container
        alignRight,      // {enum} 'left', 'center', 'right' : align text for right container
        spaceEvenly,    // {bool} will use flex to create the required containers (ex.: leftElement + title will create only 2 containers) 
    } = props;

    const containersToCreate = [0, "leftElement", "rightElement", "title"].reduce((a, b) => props[b] ? a + 1 : a)
    console.log('containersToCreate', containersToCreate)   // 2

    const flex = spaceEvenly && 1 / containersToCreate
    console.log('flex', flex)                               // .5

    const rowContainersStyle = (alignProp) => ({flex: flex || .33, textAlign: alignAll || typeof alignProp !== 'undefined' && (props[`align${alignProp}`] || 'center'), justifyContent: 'center', alignItems: 'center'})
    
    const ItemHeader = () => <div style={rowContainersStyle('')}>
        <Header
            style={contentStyle}
            content={<div style={titleStyle}>{title}</div>}
            subheader={<div style={subTitleStyle}>{subTitle}</div>}
            {...headerProps}
        />
    </div>

    const firstBlockCondition = spaceEvenly && leftElement
console.log("rowContainersStyle('Right')", rowContainersStyle('Right'))
    return <div className="flexCenter row" style={containerStyle}>
        {
            !spaceEvenly || firstBlockCondition 
            ? <div style={rowContainersStyle('Left')}>
                {
                    leftElement || spaceEvenly && <ItemHeader />
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
            ? <div style={rowContainersStyle('Right')}>
                {rightElement}
            </div>
            : null
        }

    </div>
}

export default ListItem
