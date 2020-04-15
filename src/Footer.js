import React, { Component } from 'react'
import { Icon, Divider, Image, Header, Card, Grid, Button } from 'semantic-ui-react'
import moment from 'moment'
import Colors from './constants/Colors'
import Layout from './Layout'
import logo from './transparentLogo.png'
import LegalMentions from './LegalMentions'

const AppLogo = (props) => <Image {...props} centered src={logo} size="small" />

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
            <div className={`flexCenter`} >
                <div className="gotuTextAll">

                    <div className="ui padded grid">

                        {/* footer left menu */}
                        <div className="ui seven wide column margedtop">
                            <div className="ui mid divider"></div>
                            <div><a href="#metier" className="clickable ui center aligned white header"><h4>Métier</h4></a></div>

                            
                            <div className="ui mid divider"></div>
                            <div><a href="#realisations" className="clickable ui center aligned white header"><h4>Réalisations</h4></a></div>
                           
                            <div className="ui mid divider"></div>
                            <div className="clickable ui center aligned white small header" onClick={this.logLegalMentions}><h4>Mentions légales</h4></div>

                            <div className="ui mid divider"></div>
                            <div onClick={this.props.toggleLogger} className="clickable ui center aligned white small header"><h4>Administration</h4></div>


                            <div className="ui mid divider"></div>
                            <div className="clickable ui center aligned white small header"><a className="regularATag" href="https://proapps.fr" target="_blank" rel="noopener noreferrer"><h4>Concepteur site web & application</h4></a></div>

                            <div className="ui mid divider"></div>    

                        </div>


                        {/* footer right column */}
                        <div className="ui eight wide column" >
                            <AppLogo size="small" className="shake-horizontal"/>
                            <Divider />
                            <div className="flexCenter spaceAround" style={isSmallDevice ? {flexDirection: "column", padding: '.1em'} : undefined}>
                                <Image src={require("./ffb.png")} className="clickable" alt="fédération francaise du batiment" size="small" href="https://www.ffbatiment.fr/" target="_blank" rel="noopener noreferrer"/>                               
                                <Image src="https://www.lemoniteur.fr/mediatheque/9/0/8/001402809.png" alt="site internet qualibat" className="clickable" style={isSmallDevice ? {} : {marginTop:"2%", padding:"3px", borderRadius:"7px", height:"75px", width:"75px", objectFit:"cover"}} href="https://www.qualibat.com/" target="_blank" rel="noopener noreferrer" />
                               
                            </div>
                            <Divider />

                            {/* contact */}
                            {
                                (isSmallDevice || isTablet)
                                ? ''
                                : <div className="flexCenter spaceAround" style={{alignItems: 'flex-start'}}>
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
                                        <p className="bold"> 06 11 88 80 53 </p>   
                                        <Icon name="id card outline" style={{color:Colors.white}} size="large" />
                                        <p className="bold" style={{fontSize: 12}}> 85403991400015 </p>
                                    </div>
                                </div>
                            }
                            
                        </div>

                        <div className="ui sixteen wide column">
                            <div className='flexCenter spaceAround' style={{backgroundColor: Colors.batifisGrey, width: '100vw', padding: 20}}>
                                <Image src={require("./local_business.png")} alt="entreprise 80700 roye" size="small"/>
                                <Image src="https://workandup-dev.s3.eu-west-3.amazonaws.com/IMAGES/villederoye.png" alt="ville de roye" size="tiny" href="https://roye.eu" target="_blank" rel="noopener noreferrer" />       
                                <Image src="http://cdn1_2.reseaudesvilles.fr/cities/336/logo/VMeRi2FUcIpizBx.png" alt="ville de péronne" size="small" href="https://ville-peronne.fr" target="_blank" rel="noopener noreferrer" />       
                            </div>  {/* http://cdn1_2.reseaudesvilles.fr/cities/336/logo/VMeRi2FUcIpizBx.png*/}
                        </div>
                    
                        
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default Footer