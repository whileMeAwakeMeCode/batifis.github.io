import React from 'react'

const customIcons = {
    wheelbarrow: require('./icons/wheelbarrow.png')
}

// wheelbarrow
const CustomIcon = (props) => {
    let {name, size, iconStyle, color} = props || {}
    size = size || 25;

    return props.name 
    ? <img height={size} width={size} src={customIcons[name]} style={iconStyle} color={color} />
    : null
}


export default CustomIcon