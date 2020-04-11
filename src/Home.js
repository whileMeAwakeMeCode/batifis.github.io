/* Packages */
import React, {Component} from 'react'
import { Parallax } from 'react-parallax'
import {Image, Modal, Form, Button} from 'semantic-ui-react'
// effects
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';   

/* Components*/
import AutoProgressBar from './AutoProgressBar'
import ListItem from './ListItem'
import Log from './Log'

/* Constants */
import Layout from './Layout'

/* Images */
import logo from './logo.png';
import transparentLogo from './transparentLogo.png';
import Colors from './Colors';
import Footer from './Footer';




class Home extends Component {
    state = {
        loggerOpened: false,
        loginProcessing: false
    }

    toggleLogger = () => this.setState({loggerOpened: !this.state.loggerOpened})

    login = () => {
        this.setState({loginProcessing: true})
        const {email, hash, connected} = this.state
        // fetch api
        if (connected) window.alert('Vous êtes déjà connecté !')
        else {
            this.setState({connected: true})
        }
    }

    log = (log) => this.setState({log})
    
    maybeLogMsg = () => {
        const {log} = this.state
        var { message, title, icon, iconStyle, iconColor, activityIndicator, stay, closeButton, classAttribute, timedOutComponent, maxStay } = log || {}
        maxStay = parseInt(maxStay)   // make sure we deal with a number type variable

        return(
            message || title 
            ? <Log 
                closed={typeof message === 'undefined'} 
                message={message}
                title={title}
                icon={icon}
                iconStyle={iconStyle}
                iconColor={iconColor}
                activityIndicator={activityIndicator}
                stay={stay}
                maxStay={maxStay}        
                timedOutComponent = {timedOutComponent}
                closeButton={closeButton}
                classAttribute={classAttribute || "centered"}
                logMethod={this.log.bind(this)}
            />
            : null
        )
    }

   
    render() {
        const {isSmallDevice} = Layout
        const {loginProcessing, connected} = this.state
        const anthracite = "#818181"
        const catchMarginVertical = Layout.isSmallDevice ? 50 : 100;

        return(
            
            <div>
                <Modal
                    open={this.state.loggerOpened}
                    onClose={this.toggleLogger}
                    size={isSmallDevice ? "large" : "small"}
                >
                    
                    <div style={{padding: '1em'}}>
                        <ListItem
                            spaceEvenly
                            notAccepted
                            title={<p className="silText">LOGIN</p>}
                            titleStyle={{fontSize:30}}
                            subTitle={<p className="gotuText">connectez-vous à votre compte Batifis</p>}
                            subTitleStyle={{fontSize: 15, color: "beige"}}
                            leftElement={<Image src={transparentLogo} size="small" />}
                            alignRight="center"
                            containerStyle={{backgroundColor: anthracite, padding: 10, color: "#fff"}}
                            contentStyle={{color: "#fff"}}
                        />
                        {
                            loginProcessing
                            ? <AutoProgressBar
                                color='auto'
                                end={connected}
                            />
                            : null
                        }
                        <Form style={{height: '50vh', marginTop: 30, textAlign: 'center'}}>
                                <Form.Input
                                    fluid
                                    id='email_field'
                                    label={<p style={{fontSize: 18}}>Email</p>}
                                    placeholder='entrez votre adresse email'
                                    type="email"
                                    className="silText"
                                    
                                />
                                <Form.Input
                                    fluid
                                    id='pwd_field'
                                    label={<p style={{fontSize: 18}}>Mot de passe</p>}
                                    placeholder='entrez votre mot de passe'
                                    type='password'
                                    className="silText"
                                    labelStyle={{fontSize: 19}}

                                />

                            <div className="flexCenter">
                                <Button onClick={this.login}>
                                    <p className="silText" style={{fontSize: Layout.buttonText}}>Connexion</p>
                                </Button>
                            </div>
                            
                        </Form>

                       
                    </div>
                </Modal>
                <Parallax
                    blur={0}
                    bgImage={require('./photo0.jpg')}
                    bgImageAlt="batifis"
                    bgImageStyle={{height: '50vh', width: '100vw', objectFit: 'cover', opacity: .8}}
                    strength={isSmallDevice ? 100 : 300}
                >
                    <div style={{height: '50vh'}}>
                        <div className="flexRow flexStart" style={{height: 30}}>
                            <div className="flexStart spaceAround" style={{flex: .2, fontSize: 17, color: "#0d11db"}}>    

                                <div 
                                    className="boldOnHover silText"
                                    style={{color: Colors.white}}
                                    //style={{display: 'flex', flex: .5, padding: 10, color: '#fff', fontSize: 18}}
                                    onClick={this.toggleLogger}
                                >
                                    Me connecter
                                </div>

                                <a 
                                    className="boldOnHover silText paddingHor"
                                    //style={{display: 'flex', flex: .5, padding: 10, color: '#fff', fontSize: 18}}
                                    href='mailto:contact@batifis.fr'
                                >
                                    Nous contacter  
                                </a>
                            </div>
                        </div>
                    </div>
                </Parallax>
                <div style={{height: '50vh', display: 'flex', justifyContent: 'center'}}>
                    <div style={{backgroundColor: "#fff", opacity: 1, borderTopLeftRadius: 200, borderTopRightRadius: 200, marginTop: isSmallDevice ? -50 : -130, width: '25%', position: 'absolute'}}>
                        <Image circular centered size="medium" src={logo} style={Layout.isSmallDevice ? {paddingTop: 20} : {padding: 30}} />
                    </div>
                    <div style={{flexDirection: 'column', height: '100vh'}}>
                        <p className="silText" style={{fontSize: Layout.isSmallDevice ? 28 : 50, marginTop: catchMarginVertical, marginBottom: catchMarginVertical * 1.5, width: '100%'}}>Au service de votre batiment</p>
                        <div className="flexCenter" style={{width: '100%'}}>
                            <Fade>
                                <div style={{height: '100vh', width: '100vw'}}>
                                    <p className="silText" style={{fontSize: Layout.titleText}}>retrouvez toutes les informations sur Batifis ici bientôt !</p>
                                    {/* <Grid centered>
                                        <Grid.Column style={{ textAlign: 'center'}}>1</Grid.Column>
                                        <Grid.Column>2</Grid.Column>
                                    </Grid> */}
                                </div>
                            </Fade>
                            
                        </div>
                    </div>
                  
                </div>
                
                <div className="gotuTextAll">
                    <Slide left>
                        <div className="gotuText" id="metier" style={{height: '50vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.batifisBlue, color: Colors.white}}>
                                Notre Métier
                        </div>
                    </Slide>

                    <Slide right>
                        <div id="realisations" style={{height: '50vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.batifisGrey, color: Colors.black}}>
                            
                                Nos Réalisations
                        
                        </div>
                    </Slide>

                    <Slide bottom>
                        <div id="contact" style={{height: '50vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.white, color: Colors.black}}>
                                
                                Nous contacter
                        
                        </div>
                    </Slide>
                    
                    {/* footer */}
                    {/* <div style={{height: '20vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.anthracite, color: Colors.white, border: 'solid', borderWidth: 0, borderTopWidth: 1, borderColor: Colors.red}}>
                        <Image left size="small" src={transparentLogo} style={{backgroundColor: 'transparent', ...Layout.isSmallDevice ? {paddingTop: 20} : {padding: 30}}} />

                    </div> */}
                    <div className="footerWrapper" style={{backgroundColor: Colors.anthracite, color: Colors.white, border: 'solid', borderWidth: 0, borderTopWidth: 1, borderColor: Colors.red}}>
                        <Footer Log={this.log.bind(this)} />
                    </div>
                </div>
                {this.maybeLogMsg()}
            </div>
           
        )
    }
}





export default Home
