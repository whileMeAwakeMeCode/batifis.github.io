import React, { Component } from 'react'
import { Icon, Divider, Image } from 'semantic-ui-react'
import Colors from '../constants/Colors'
import Layout from './Layout'
import logo from '../images/transparentLogo.png'
import proAppsLogo from '../images/proAppsFull.png'
import LegalMentions from './LegalMentions'

const AppLogo = (props) => <Image {...props} centered src={logo} size={props.size || "small"} />
const ContactData = () => <div className="flexCenter spaceAround" style={{alignItems: 'flex-start'}}>
<div>
    <Icon name="map marker alternate" style={{color:Colors.white}} size="large" />
    <p className="bold"> 
        <li className="leftAlign">12 place de la 2ème db,
            <br />
            80200 Péronne
        </li> 
        <li className="leftAlign">3 ter rue de fresnoy,
            <br />
            80700 Roye
        </li> 
    </p>
</div>
<div>
    <Icon name="phone" style={{color:Colors.white}} size="large" />
    <p className="bold white"><a href="tel:+33611888053"> 06 11 88 80 53 </a></p>  

    <Icon name="envelope" style={{color:Colors.white}} size="large" />
    <p className="bold white"> <a href="mailto:contact@batifis.fr">contact@batifis.fr</a></p>   

    <Icon name="id card outline" style={{color:Colors.white}} size="large" />
    <p className="bold" style={{fontSize: 12}}> 85403991400015 </p>
</div>
</div>
/**
 * ##PROPS
 *  - toggleLogger {function}(bound) : allow toggling Home login modal
 *  - modalOpener {function}(bound) : allow login any component within a modal
 */
class Footer extends Component {
    state = {}

    logLegalMentions = () => {
        var { modalOpener } = this.props    // App's "log" state setter

        modalOpener({
            message:<LegalMentions appLogo={AppLogo}/>, 
            stay:true, 
            closeButton:true, 
            size: 'fullscreen', 
            classAttribute:'gotuTextAll', 
            closeText: <div>Ok<Icon style={{paddingLeft: 5}} name="thumbs up outline" color="white"/></div>
        });

        return true
    }

    

    render() {
        const { isSmallDevice, isTablet } = Layout

        return(                     // txtOneFiveAll
            <div className={`flexCenter`} style={{padding: Layout.footerPadding}}>
                <div className="gotuTextAll">

                    <div className="ui grid">

                        {/* footer left menu */}
                        <div className={`ui ${Layout.footerFirstColClass} wide column margedtop`}>
                            <div className="ui mid divider"></div>
                            <div><a href="mailto:contact@batifis.fr" className="clickable ui center aligned white header"><h4>Contact</h4></a></div>

                            <div className="ui mid divider"></div>
                            <div><a href="#metier" className="clickable ui center aligned white header"><h4>Métier</h4></a></div>

                            
                            <div className="ui mid divider"></div>
                            <div><a href="#realisations" className="clickable ui center aligned white header"><h4>Réalisations</h4></a></div>
                           
                            <div className="ui mid divider"></div>
                            <div className="clickable ui center aligned white small header" onClick={this.logLegalMentions}><h4>Mentions légales</h4></div>

                            <div className="ui mid divider"></div>
                            <div onClick={this.props.toggleLogger} className="clickable ui center aligned white small header"><h4>Administration</h4></div>


                            <div className="ui mid divider"></div>
                            <div style={{paddingTop: 50}} className="clickable ui center aligned white small header">
                                <a className="regularATag" href="https://proapps.fr" target="_blank" rel="noopener noreferrer"><h4>Site web & Application</h4></a>
                                <Image src={proAppsLogo} alt="site internet proapps" className="clickable" style={isSmallDevice ? {} : {marginTop:"10px", width:Layout.landscape ? '25%' : '100%', height:"auto", objectFit:"contain"}} href="https://proapps.fr/" target="_blank" rel="noopener noreferrer" />
                            </div>

                        </div>


                        {/* footer right column */}
                        <div className={`ui ${Layout.footerSecondColClass} wide column`} >
                            <AppLogo size="medium" className="shake-horizontal"/>
                            <Divider />
                            <div className="flexCenter spaceAround" style={isSmallDevice ? {flexDirection: "column", padding: '.1em'} : undefined}>
                                <Image src={require("../images/ffb.png")} className="clickable" alt="fédération francaise du batiment" size="small" href="https://www.ffbatiment.fr/" target="_blank" rel="noopener noreferrer"/>                               
                                <div style={{padding: Layout.footerPadding}}>
                                    <Image src="https://www.lemoniteur.fr/mediatheque/9/0/8/001402809.png" alt="site internet qualibat" className="clickable" style={isSmallDevice ? {} : {marginTop:"2%", padding:"3px", borderRadius:"7px", height:"75px", width:"75px", objectFit:"cover"}} href="https://www.qualibat.com/" target="_blank" rel="noopener noreferrer" />
                                </div>
                            </div>
                            <Divider />

                            {/* contact */}
                            {
                                (isSmallDevice || isTablet)
                                ? null
                                : <ContactData />
                            }
                            
                        </div>

                        {
                            (isSmallDevice || isTablet)
                            ? <ContactData />
                            : null
                        }

                        <div className="ui sixteen wide column">
                            <div className='flexCenter spaceAround' style={{backgroundColor: Colors.batifisGrey, width: '100vw', padding: 20}}>
                                <Image src={require("../images/local_business.png")} alt="entreprise 80700 roye" size="small"/>
                                <Image src={require('../images/villederoye.png')} alt="ville de roye" size="tiny" href="https://roye.eu" target="_blank" rel="noopener noreferrer" />       
                                <Image src={require('../images/villedeperonne.png')} alt="ville de péronne" size="tiny" href="https://ville-peronne.fr" target="_blank" rel="noopener noreferrer" />       
                            </div>  {/* http://cdn1_2.reseaudesvilles.fr/cities/336/logo/VMeRi2FUcIpizBx.png*/}
                        </div>
                    
                        
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default Footer