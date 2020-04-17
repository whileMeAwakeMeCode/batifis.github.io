const protectImages = () => {
    // lock context menu (disable right click on images)
    document.querySelector('body').addEventListener('contextmenu', (e) => { e.preventDefault(); }) 
    // lock drag and drop on images // dragstart drop
    document.querySelector('body').addEventListener('dragstart drop', (e) => { e.preventDefault(); }) 
}

/**
 * @dev Listen orientation change if client's browser is a mobile one 
 * @param {function} orientationChangeHandler : a function to respond to orientation change event
 * @notice if client's browser is a desktop one, this module will skip the process and no event will be set
 * @return {false|function} 
 *  - boolean false (no event set) : if desktop browser or if no orientationChangeHandler argument is received
 *  - function orientationChangeEventRemover (event set) : a function to call to remove the listener
 */
const listenOrientation = async(orientationChangeHandler) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);    
    (async(a) => {
        if( isMobile ) 
        {
            // listen device orientation if mobile device browser
            console.log(" ---> client is visiting us from a mobile device, listening orientation change...")
            if (typeof orientationChangeHandler === 'function') {
                window.addEventListener('orientationchange', orientationChangeHandler)
                window.orientationChangeEventRemover = () => window.removeEventListener('orientationchange', orientationChangeHandler)                
            }  
        }
        else {
            console.log(" ---> client is visiting us from a desktop device, orientation change listener settings skipped")
        }
    })(navigator.userAgent||navigator.vendor||window.opera);
    return isMobile
      
}

module.exports = {
    listenOrientation,
    protectImages
}