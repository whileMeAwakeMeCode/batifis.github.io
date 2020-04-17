import Colors from './Colors'
const appButtonBlue = {
    backgroundColor: Colors.batifisBlue,
    color: Colors.white,
    borderRadius: 10
}
const Styles = {
    appButtonBlue,
    appButtonWhite: {
        backgroundColor: Colors.white,
        color: Colors.batifisBlue,
        borderRadius: 10
    },
    flexColumn: {flexDirection: "column", flex: 1},
    largeAppBlueButton: {...appButtonBlue, width: '90vw'},
    invisible: {height: 0, color: 'transparent', zIndex: -1},
    oneEmPadding: {padding: '1em'},
    beige15: {fontSize: 15, color: "beige"},
    anthraciteSegment: {backgroundColor: Colors.lightAnthracite, padding: 10, color: "#fff"},
    whiteText: {color: "#fff"},
    loginFormWrapper: {height: '50vh', marginTop: 30, textAlign: 'center'},
    parallaxBg: {height: '50vh', width: '100vw', objectFit: 'cover', opacity: .8}, 
    height30: {height: 30},
    logoSegmentWrapper: {height: '50vh', display: 'flex', justifyContent: 'center'},
    fullHeightColumn: {flexDirection: 'column', height: '100vh'},
    fontSize: (_s) => ({fontSize: _s}),





}

export default Styles