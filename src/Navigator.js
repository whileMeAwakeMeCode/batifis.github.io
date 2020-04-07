import React from 'react'
import { Parallax, Background } from 'react-parallax'
import Layout from './Layout'
import {Segment, Image, Modal, Form, Header, Icon, Button} from 'semantic-ui-react'
import AutoProgressBar from './AutoProgressBar'
import logo from './logo.png';
import transparentLogo from './transparentLogo.png';


import ListItem from './ListItem'

class Navigator extends React.Component {
    state = {
        loggerOpened: true,
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
                            title="LOGIN"
                            titleStyle={{fontSize:30}}
                            subTitle="connectez-vous à votre compte Batifis"
                            subTitleStyle={{fontSize: 15, color: "beige"}}
                            leftElement={<Image src={transparentLogo} size="small" />}
                            alignRight="center"
                            containerStyle={{backgroundColor: anthracite, padding: 10, color: "#fff"}}
                            contentStyle={{color: "#fff"}}
                        />
                        {
                            loginProcessing
                            ? <AutoProgressBar
                                autoColors
                                end={connected}
                            />
                            : null
                        }
                        <Form style={{height: '50vh', marginTop: 30}}>
                                <Form.Input
                                    fluid
                                    id='email_field'
                                    label='Email'
                                    placeholder='entrez votre adresse email'
                                    type="email"
                                />
                                <Form.Input
                                    fluid
                                    id='pwd_field'
                                    label='Mot de passe'
                                    placeholder='entrez votre mot de passe'
                                    type='password'
                                />

                            <div className="flexCenter">
                                <Button
                                    title="connexion"
                                    titleStyle={{color: "green"}}
                                    onClick={this.login}
                                >
                                    Connexion
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
                            className="boldOnHover"
                            style={{display: 'flex', flex: 1, justifyContent: "flex-end", padding: 10, color: '#fff'}}
                            onClick={this.toggleLogger}
                        >
                            Me connecter  
                        </div>
                    </div>
                </Parallax>
                <div style={{height: '50vh', display: 'flex', justifyContent: 'center'}}>
                    <div style={{backgroundColor: "#fff", opacity: 1, borderTopLeftRadius: 200, borderTopRightRadius: 200, marginTop: isSmallDevice ? -50 : -130, width: '25%', position: 'absolute'}}>
                        <Image circular centered size="medium" src={logo} style={{paddingTop: 20}} />
                    </div>
                </div>
                <Segment style={{height: '150vh'}}></Segment>
            </div>
           
        )
    }
}



export default Navigator
