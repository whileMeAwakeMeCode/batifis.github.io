export default {
   
    height: window.innerHeight,
    width: window.innerWidth,
    isSmallDevice: window.innerWidth < 500,
    isTablet: (window.innerWidth <= 800) && (window.innerWidth >= 500),
    portrait: window.innerWidth < window.innerHeight,
    landscape: window.innerHeight < window.innerWidth
    
}