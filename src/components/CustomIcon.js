import React from 'react'

const customIcons = {
    maconnerie: require('../icons/maconnerie.png'),
    construction: require('../icons/construction.png'),
    carrelage: require('../icons/carrelage.png'),
    isolation: require('../icons/isolation.png'),
    renoInt: require('../icons/renoInt.png'),
    renoExt: require('../icons/renoExt.png'),
    peinture: require('../icons/peinture.png'),
    enduit: require('../icons/enduit.png')
}

// wheelbarrow
const CustomIcon = (props) => {
    let {name, size, iconStyle, color} = props || {}
    size = size || 25;

    return props.name 
    ? <img alt="" height={size} width={size} src={customIcons[name]} style={iconStyle} color={color} />
    : null
}


export default CustomIcon