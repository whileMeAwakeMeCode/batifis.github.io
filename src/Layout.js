

const isSmallDevice = window.innerWidth < 500;

export default {
    height: window.innerHeight,
    width: window.innerWidth,
    isSmallDevice,
    isTablet: (window.innerWidth <= 800) && (window.innerWidth >= 500),
    portrait: window.innerWidth < window.innerHeight,
    landscape: window.innerHeight < window.innerWidth,
    titleText: isSmallDevice ? 15 : 25,
    buttonText: isSmallDevice ? 14 : 17,
}