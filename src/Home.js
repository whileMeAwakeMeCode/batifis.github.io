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
import CustomIcon from './CustomIcon';


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

    log = (log) => {
        console.log(' ---> loggin an msg...')
        this.setState({log, loggerOpened: false})
    }
    
    maybeLogMsg = () => {
        const {log} = this.state
        console.log(' ---> logging log ', log)

        var { message, title, classAttribute, maxStay/*, icon, iconStyle, iconColor, activityIndicator, stay, closeButton, timedOutComponent */} = log || {}
        maxStay = parseInt(maxStay);   // make sure we deal with a number type variable

        return(
            message || title 
            ? <Log 
                // message={message}
                // title={title}
                // icon={icon}
                // iconStyle={iconStyle}
                // iconColor={iconColor}
                // activityIndicator={activityIndicator}
                // stay={stay}
                // timedOutComponent = {timedOutComponent}
                // closeButton={closeButton}
                {...log}
                maxStay={maxStay}        
                closed={typeof message === 'undefined'} 
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
            
            <div style={{zIndex: 1}}>
                <div key="metas" style={{height: 0, color: 'transparent', zIndex: -1}}>
                    <p className="unselectable tt">
                        Bonjour et bienvenue sur le site internet de l’entreprise Batifis, entreprise de maçonnerie, rénovations de l’habitat situé en Picardie à Péronne (80200) et à Roye(80700) - entreprise de maçonnerie Roye - entreprise de maconnerie roye - entreprise de maçonnerie Ham - entreprise de maconnerie ham - entreprise de maçonnerie Chaulnes - entreprise de maconnerie chaulnes - entreprise de maçonnerie Rosières en santerre - entreprise de maconnerie rosières en santerre - entreprise de maçonnerie Noyon - entreprise de maconnerie noyon - entreprise de maçonnerie montdidier - entreprise de maconnerie montdidier - entreprise de maçonnerie moreuil - entreprise de maconnerie moreuil - entreprise de maçonnerie ressons sur Matz - entreprise de maconnerie ressons sur matz - entreprise de maçonnerie Nesle - entreprise de maconnerie nesle - entreprise de maçonnerie Boves - entreprise de maconnerie nesle - entreprise de maçonnerie Amiens - entreprise de maconnerie amiens - entreprise de maçonnerie Compiègne - entreprise de maconnerie compiègne - entreprise de maçonnerie ailly sur noye - entreprise de maconnerie ailly sur noye - entreprise de maçonnerie 80340 Bray sur somme - entreprise de maconnerie Bray sur somme 80340 - Rénovation Roye- Renovation Ham - Renovation Chaulnes - Renovation Rosieres en Santerre - Renovation Noyon - Renovation Montdidier - Renovation Moreuil - Renovation Ressons sur Matz - Renovation 80340 Bray sur somme - Renovation Nesle - Renovation Boves - Renovation Amiens - Renovation Plessier Rozainvillers - Renovation Ailly sur Noye - Pose de carrelage Roye - Pose de carrelage Ham - Pose de carrelage Chaulnes - Pose de carrelage Rosieres en Santerre - Pose de carrelage Noyon - Pose de carrelage Montdidier - Pose de carrelage Moreuil - Pose de carrelage Ressons sur Matz - Pose de carrelage 80340 Bray sur somme -  Pose de carrelage Nesle - Pose de carrelage Boves - Pose de carrelage Amiens - pose de carrelage Plessiers Rozainvillers - Pose de carrelage Ailly sur Noye - Maçonnerie Roye - maconnerie roye - Maçonnerie Ham - maconnerie ham - Maçonnerie Chaulnes - maconnerie chaulnes - Maçonnerie Rosières en Santerre - maconnerie rosières en santerre - Maçonnerie 80340 Bray sur somme - maconnerie Bray sur somme 80340 - Maçonnerie Noyon - maconnerie noyon - Maçonnerie Montdidier - maconnerie montdidier - Maçonnerie Moreuil - maconnerie moreuil - Maçonnerie Ressons sur Matz - maconnerie ressons sur matz - Maçonnerie Nesle - maconnerie boves - Maçonnerie Boves - Maçonnerie Amiens - maconnerie amiens - Maçonnerie Plessier Rozainvillers - maconnerie plessier rozainvillers - Maçonnerie Ailly sur Noye - maconnerie ailly sur noye - isolation Roye - isolation Ham - Isolation Chaulnes - Isolation Rosières en santerre - Isolation Noyon - Isolation Montdidier - Isolation Moreuil - Isolation Ressons sur Matz- Isolation Nesle - Isolation Boves - Isolation Amiens - Isolation Plessier Rozainvillers - Isolation 80340 Bray sur somme - Isolation Ailly sur Noye - Maçon Roye - Maçon Ham - Maçon Chaulnes - Maçon Rosieres en santerre - Maçon Noyon - Maçon Montdidier - Maçon Moreuil - Maçon Ressons sur Matz - Maçon Nesle - Maçon Nesle - Maçon Boves - Maçon Amiens - Maçon 80340 Bray sur somme - Maçon Plessier Rozainvillers - Maçon Ailly sur Noye - cloture Roye - cloture Ham - cloture Chaulnes - cloture Rosieres en santerre - cloture Noyon - cloture Montdidier - cloture Moreuil - cloture Ressons sur Matz - cloture Nesle - cloture Boves - cloture Amiens - cloture 80340 Bray sur somme - cloture Plessier Rozainvillers - cloture Ailly sur Noye - pose de cloture Roye - pose de cloture Ham - pose de cloture Chaulnes - pose de cloture Rosières en santerre - pose de cloture Noyon - pose de cloture Montdidier - pose de cloture Moreuil - pose de cloture 80340 Bray sur somme - pose de cloture Ressons sur Matz - pose de cloture Nesle - pose de cloture Boves - pose de cloture Amiens - pose de cloture Plessier Rozainvillers - pose de cloture Ailly sur Noye
                    </p>
                </div>
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
                                    Connexion
                                </div>

                                <a 
                                    className="boldOnHover silText white"
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
                        <div className="silTextAll" id="metier" style={{height: '50vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.batifisBlue, color: Colors.white}}>
                                <p style={{fontSize: Layout.titleText, marginTop: 5}}>Notre Métier</p>
                                <div className="flexCenter row" style={{padding: '10vw'}}>
                                    <div className="flexHalf row">
                                        <CustomIcon name="wheelbarrow" size={40} />
                                        <ul><li className="silText" style={{fontSize: 25}}>Maçonnerie</li></ul>
                                    </div>
                                    <div className="flexHalf">
                                        {/* right column */}
                                    </div>
                                </div>
                                
                        </div>
                    </Slide>

                    <Slide right>
                        <div id="realisations" style={{height: '50vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.batifisGrey, color: Colors.black}}>
                            
                                Nos Réalisations
                        
                        </div>
                    </Slide>

                    
                    {/* footer */}
                    {/* <div style={{height: '20vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.anthracite, color: Colors.white, border: 'solid', borderWidth: 0, borderTopWidth: 1, borderColor: Colors.red}}>
                        <Image left size="small" src={transparentLogo} style={{backgroundColor: 'transparent', ...Layout.isSmallDevice ? {paddingTop: 20} : {padding: 30}}} />

                    </div> */}
                    <div className="footerWrapper" style={{backgroundColor: Colors.anthracite, color: Colors.white, border: 'solid', borderWidth: 0, borderTopWidth: 1, borderColor: Colors.red}}>
                        <Footer modalOpener={this.log.bind(this)} toggleLogger={this.toggleLogger.bind(this)}/>
                    </div>
                </div>
                {this.maybeLogMsg()}
            </div>
           
        )
    }
}





export default Home
