/* Packages */
import React from 'react'
import { Parallax, Background } from 'react-parallax'
import {Segment, Image, Modal, Form, Header, Transition, Button, Grid} from 'semantic-ui-react'
import Fade from 'react-reveal/Fade';

/* Components*/
import AutoProgressBar from './AutoProgressBar'
import ListItem from './ListItem'

/* Constants */
import Layout from './Layout'

/* Images */
import logo from './logo.png';
import transparentLogo from './transparentLogo.png';
import backgroundWhiteTexture from './backgroundWhiteTexture.jpg'


class Navigator extends React.Component {
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
                        <div 
                            className="boldOnHover silText"
                            style={{display: 'flex', flex: 1, justifyContent: "flex-end", padding: 10, color: '#fff', fontSize: 18}}
                            onClick={this.toggleLogger}
                        >
                            Me connecter  
                        </div>
                    </div>
                </Parallax>
                <div style={{height: '50vh', display: 'flex', justifyContent: 'center'}}>
                    <div style={{backgroundColor: "#fff", opacity: 1, borderTopLeftRadius: 200, borderTopRightRadius: 200, marginTop: isSmallDevice ? -50 : -130, width: '25%', position: 'absolute'}}>
                        <Image circular centered size="medium" src={logo} style={Layout.isSmallDevice ? {paddingTop: 20} : {padding: 30}} />
                    </div>
                    <div style={{flexDirection: 'column'}} style={{height: '100vh'}}>
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

            </div>
           
        )
    }
}



export default Navigator
