

const isSmallDevice = window.innerWidth < 500;
const catchMarginVertical = isSmallDevice ? 50 : 100

const getLayout = () => ({
    height: window.innerHeight,
    width: window.innerWidth,
    isSmallDevice,
    isTablet: (window.innerWidth <= 800) && (window.innerWidth >= 500),
    portrait: window.innerWidth < window.innerHeight,
    landscape: window.innerHeight < window.innerWidth,
    titleText: isSmallDevice ? 15 : 25,
    bigTitleText: isSmallDevice ? 23 : 30,
    buttonText: isSmallDevice ? 14 : 17,
    catTitleList: isSmallDevice ? '80vw' : '20vw',
    catTitleMargin: isSmallDevice ? '10vw' : '5vw',
    parallaxStrength: isSmallDevice ? 100 : 300,
    parallaxRow: {flex: isSmallDevice ? .3 : .2, fontSize: 17, color: "#0d11db"},
    logoWrapper: {backgroundColor: "#fff", opacity: 1, borderTopLeftRadius: 200, borderTopRightRadius: 200, marginTop: isSmallDevice ? -50 : -130, width: '25%', position: 'absolute', overFlow: 'hidden'},
    logoPadding: isSmallDevice ? {paddingTop: 20} : {padding: 30},
    welcomeText: {fontSize: isSmallDevice ? 28 : 50, marginTop: catchMarginVertical, marginBottom: catchMarginVertical * 1.5, width: '100%'},
    
})

export default {...getLayout(), getLayout}