/* Packages */
import React, {Component} from 'react'
import { Parallax } from 'react-parallax'
import {Image, Modal, Form, Button, Icon, Dimmer} from 'semantic-ui-react'
// effects
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';   

/* Components*/
import AutoProgressBar from './AutoProgressBar'
import ListItem from './ListItem'
import Log from './Log'
import Carousel from './Carousel'
import Intranet from './Intranet'

/* Constants */
import layout from './Layout'
import Api from '../constants/Api'
import { protectImages, listenOrientation } from '../constants/StartUpEvents'
import { apostrophe } from '../constants/Utils'
/* Images */
import logo from '../images/logo.png';
import transparentLogo from '../images/transparentLogo.png';
import Colors from '../constants/Colors';
import Footer from './Footer';
import CustomIcon from './CustomIcon';
import Crypto from './Crypto';
import Styles from '../constants/Styles';

const Layout = layout.getLayout()

class Home extends Component {
    getOrientation = () => window.screen.orientation.type.split('-')[0]

    state = {
        loggerOpened: false,
        loginProcessing: false,
        activeCategory: null,   // by default realisations list contains images from all category of realisations and the activeCategory(tag id) view is hidden
    }

    categories = [
        {
            title: "Maçonnerie",
            key: "maconnerie",
        },
        {
            title: "Rénovation intérieur",
            key: 'renoInt',
        },
        {
            title: "Rénovation extérieur",
            key: 'renoExt',
        },
        {
            title: "Carrelage et Faïence",
            key: 'carrelage',
        },
        {
            title: "Construction",
            key: 'construction',
            //iconSize: 70
        },
        {
            title: "Isolation",
            key: 'isolation',
        },
        {
            title: "Peinture",
            key: "peinture",
        },
        {
            title: "Enduit",
            key: 'enduit',
        }
    ];


    categoriesOptions = this.categories.map(
        ({key, title}) => ({key: key, text: title, value: {key, title}})
    );

    reachRealisations = async() => {
        // get all realisations
        const carouselData = await Api.get('photos')
        this.setState({carouselData})  
    }

    

    orientationListener = () => {
       
        const {availWidth, availHeight} = window.screen
        
        //this.setState({forbiddenOrientation: orientation === 'landscape'})
        if (availWidth >= availHeight) {
            this.setState({forbiddenOrientation: true})
        }
        else if (this.state.forbiddenOrientation) 
            this.setState({forbiddenOrientation: false})
        
            console.log('orientation', availWidth >= availHeight ? 'landscape' : 'portrait')
       
    }

    async componentDidMount() {
        const {availWidth, availHeight} = window.screen
        // fetch realisations
        this.reachRealisations()
        
        // protect all images from stealing
        protectImages();
 
        // listen to mobile device orientation change
        const isMobile = await listenOrientation(this.orientationListener)        
        console.log('isMobile', isMobile)  
        
        // check if current orientation is allowed
        if (availWidth > availHeight && isMobile) {
            console.log('*LANDSCAPE TRIGGERED ON MOUNT*')

            // TODO : change Layout : TODO

            this.setState({forbiddenOrientation: true})
        }

        // RAT :
        // const MehmetHash = await Crypto.encrypt(`batifice@laposte.net::Batifis@2020$`, true)
        // console.log(' ===> MehmetHash', MehmetHash)
    }

   

    componentWillUnmount() {
        // remove orientation change event handler on mobile
        typeof window.orientationChangeEventRemover === 'function' && window.orientationChangeEventRemover()
    }


    toggleLogger = () => this.setState({loggerOpened: !this.state.loggerOpened})
    toggleIntranet = () => {
        window.scrollTo(0, 0)
        this.setState({ displayIntranet: !this.state.displayIntranet, loggerOpened: false })
    }

    login = async() => {
        const {email, pwd, connected} = this.state
        if (connected) window.alert('Vous êtes déjà connecté !')
        else {
            this.setState({loginProcessing: true})

            const getAdmhash = (() => {
                return(() => {
                    return "d0b80d5187f7abeb67c972b16cef1379ba9b4589370baca9a0df6076fd8e7a2c1c52999def0353a761c277e53a28f045"
                })()
            })
           
            const hash = await Crypto.encrypt(`${email}::${pwd}`, true)
            const isAdm = await Promise.resolve(
                getAdmhash() === hash
            )
       
        
            this.setState({connected: isAdm, loginProcessing: isAdm || false, loginError: !isAdm, intranetActivated: !isAdm})
            
            setTimeout(() => {

                isAdm
                ? this.toggleIntranet()
                : (() => {
                    const msgColor = isAdm ? 'green' : 'red';
                    const msgTitle = isAdm ? 'Succès' : 'Erreur';
                    const msgIcon = isAdm ? 'check' : 'close'
                    const msg = isAdm ? 'Vous êtes connecté' : 'Connexion refusée';

                    this.log({
                        title: msgTitle,
                        titleStyle: {color: msgColor},
                        message: msg,
                        icon: msgIcon,
                        iconStyle: {color: msgColor},
                        maxStay: 1500,
                        size: 'tiny',
                        styleSheet: {textAlign: 'center'}
                    });
                })()  

            }, 500)
        }
    }

    log = (log) => {
        this.setState({log, loggerOpened: !this.state.loginError ? false : this.state.loggerOpened})
    }
    
    maybeLogMsg = () => {
        const {log} = this.state

        var { message, title, classAttribute, maxStay/*, icon, iconStyle, iconColor, activityIndicator, stay, closeButton, timedOutComponent */} = log || {}
        maxStay = parseInt(maxStay);   // make sure we deal with a number type variable
        const displayLog = message || title
        return(
            displayLog 
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

    scrollTo = (route) => {
        window.location.href = `/#${route}`
    }

    goToCategoriesMenu = () => this.scrollTo('metier')
    goToRealisations = () => this.scrollTo('realisations')

    sortRealisationsByCategory = async(catKey) => {
        const {carouselData} = this.state
        //console.log('carouselData', carouselData.map((cd) => cd.categories.indexOf(catKey) >= 0))
        let carouselDataSorting = await Promise.resolve(
            carouselData.map((cd) => cd.categories.indexOf(catKey) >= 0)
        )

        let sortedCarouselData = await Promise.resolve(
            carouselData.filter((cd, cdi) => carouselDataSorting[cdi])    
        )
        
        this.setState({sortedCarouselData})
    }

    activateCategory = async(activeCategory) => {
        
        let sortedList = await this.sortRealisationsByCategory(activeCategory.key)
        console.log('sortedList', sortedList)
        this.scrollTo('activeCategory')
        this.setState({activeCategory})
    }

    resetActiveCategory = () => {
        this.setState({activeCategory: null})
        setTimeout(() => {
            this.scrollTo('realisations')
        })
    }


    
    renderCategoriesColumn = (colIndex) => {
        let _categories = Array.from(this.categories)   // do not work on original this.categories

        const catLength = _categories.length

        const colChangeIndex = (catLength) / 2

        const topIndex = colIndex === 0 ? 0 : colChangeIndex

        // column categories
        const colCats = _categories.splice(topIndex, Layout.isSmallDevice ? catLength : colChangeIndex)
        
        return (
            <div key={`cat_${colIndex}`} className="flexCenter spaceAround" style={Styles.flexColumn}>
                <Fade>
                {
                    colCats.map((cat, catIndex) => <div 
                            key={`column${colIndex}_category_${catIndex}`} 
                            className={`clickable flexHalf row`}
                            onClick={() => this.activateCategory(cat)}
                        >
                            {<CustomIcon name={cat.key} size={cat.iconSize || 40} />}
                            <ul className="catTitleList" style={{width: Layout.catTitleList}}>
                                <li className="noDot silText noWrap" style={{fontSize: Layout.bigTitleText, marginLeft: Layout.catTitleMargin}}>
                                    {cat.title}
                                </li>
                            </ul>
                        </div>
                    )
                }
                </Fade>
            </div>
        )
    }

    setEmail = (_, {value:email}) => this.setState({email, loginError: false, loginProcessing: false})
    setHash = (_, {value:pwd}) => this.setState({pwd, loginError: false, loginProcessing: false})
    closeIntranetUpdateList = async() => {
        this.toggleIntranet()
        this.reachRealisations()
    }
    intranetOrLogger = () => this.state.connected ? this.toggleIntranet() : this.toggleLogger()

    removeImageSource = async(source) => {
        //set progress bar on top of "Réalisation title"
        try {
            const removal = await Api.remove(source)
            if (removal.status === 200) {
                // update carouselData from server response
                const {data: carouselData} = removal;
                this.setState({carouselData})

            } else throw(Error(`removal operation failed with status ${removal.status}`))

        }catch(e) {
            console.log('removeImageSource')
            this.log({
                title: 'Erreur',
                titleStyle: {color: Colors.anthracite},
                message: 'Il y a eu une erreur lors de la suppression de votre image, veuillez réessayer. Si le problème persiste, contactez le support',
                icon: 'close',
                iconStyle: {color: 'red'},
                stay: true,
                size: 'small',
                closeButton: true,
                closeText: 'Ok',
                styleSheet: {textAlign: 'center'}
            });
        }
    }

    render() {
        const {isSmallDevice} = Layout
        const {loginProcessing, connected, activeCategory, loginError, displayIntranet, carouselData, sortedCarouselData, forbiddenOrientation} = this.state
        const CategorySelection = () => <Button className="appButtonBlue" style={Styles.largeAppBlueButton} onClick={this.goToCategoriesMenu}>Sélectionner une autre catégorie</Button>;
        return(
            <div>
                <Modal dimmer='blurring' size='mini' open={forbiddenOrientation} style={{textAlign: 'center'}} ><Modal.Header><Icon name="warning" />Oups</Modal.Header><Modal.Content>Veuillez revenir en mode portrait</Modal.Content></Modal>
                {this.maybeLogMsg()}
                {
                    displayIntranet
                    ? <Intranet log={this.log.bind(this)} categories={this.categoriesOptions} closeIntranet={this.closeIntranetUpdateList.bind(this)} />
                    : <div style={{zIndex: 1}}>
                        <div key="metas" style={Styles.invisible}>
                            <p className="unselectable tt">
                                Bonjour et bienvenue sur le site internet de l’entreprise Batifis, entreprise de maçonnerie, rénovations de l’habitat situé en Picardie à Péronne (80200) et à Roye(80700) - entreprise de maçonnerie Roye - entreprise de maconnerie roye - entreprise de maçonnerie Ham - entreprise de maconnerie ham - entreprise de maçonnerie Chaulnes - entreprise de maconnerie chaulnes - entreprise de maçonnerie Rosières en santerre - entreprise de maconnerie rosières en santerre - entreprise de maçonnerie Noyon - entreprise de maconnerie noyon - entreprise de maçonnerie montdidier - entreprise de maconnerie montdidier - entreprise de maçonnerie moreuil - entreprise de maconnerie moreuil - entreprise de maçonnerie ressons sur Matz - entreprise de maconnerie ressons sur matz - entreprise de maçonnerie Nesle - entreprise de maconnerie nesle - entreprise de maçonnerie Boves - entreprise de maconnerie nesle - entreprise de maçonnerie Amiens - entreprise de maconnerie amiens - entreprise de maçonnerie Compiègne - entreprise de maconnerie compiègne - entreprise de maçonnerie ailly sur noye - entreprise de maconnerie ailly sur noye - entreprise de maçonnerie 80340 Bray sur somme - entreprise de maconnerie Bray sur somme 80340 - Rénovation Roye- Renovation Ham - Renovation Chaulnes - Renovation Rosieres en Santerre - Renovation Noyon - Renovation Montdidier - Renovation Moreuil - Renovation Ressons sur Matz - Renovation 80340 Bray sur somme - Renovation Nesle - Renovation Boves - Renovation Amiens - Renovation Plessier Rozainvillers - Renovation Ailly sur Noye - Pose de carrelage Roye - Pose de carrelage Ham - Pose de carrelage Chaulnes - Pose de carrelage Rosieres en Santerre - Pose de carrelage Noyon - Pose de carrelage Montdidier - Pose de carrelage Moreuil - Pose de carrelage Ressons sur Matz - Pose de carrelage 80340 Bray sur somme -  Pose de carrelage Nesle - Pose de carrelage Boves - Pose de carrelage Amiens - pose de carrelage Plessiers Rozainvillers - Pose de carrelage Ailly sur Noye - Maçonnerie Roye - maconnerie roye - Maçonnerie Ham - maconnerie ham - Maçonnerie Chaulnes - maconnerie chaulnes - Maçonnerie Rosières en Santerre - maconnerie rosières en santerre - Maçonnerie 80340 Bray sur somme - maconnerie Bray sur somme 80340 - Maçonnerie Noyon - maconnerie noyon - Maçonnerie Montdidier - maconnerie montdidier - Maçonnerie Moreuil - maconnerie moreuil - Maçonnerie Ressons sur Matz - maconnerie ressons sur matz - Maçonnerie Nesle - maconnerie boves - Maçonnerie Boves - Maçonnerie Amiens - maconnerie amiens - Maçonnerie Plessier Rozainvillers - maconnerie plessier rozainvillers - Maçonnerie Ailly sur Noye - maconnerie ailly sur noye - isolation Roye - isolation Ham - Isolation Chaulnes - Isolation Rosières en santerre - Isolation Noyon - Isolation Montdidier - Isolation Moreuil - Isolation Ressons sur Matz- Isolation Nesle - Isolation Boves - Isolation Amiens - Isolation Plessier Rozainvillers - Isolation 80340 Bray sur somme - Isolation Ailly sur Noye - Maçon Roye - Maçon Ham - Maçon Chaulnes - Maçon Rosieres en santerre - Maçon Noyon - Maçon Montdidier - Maçon Moreuil - Maçon Ressons sur Matz - Maçon Nesle - Maçon Nesle - Maçon Boves - Maçon Amiens - Maçon 80340 Bray sur somme - Maçon Plessier Rozainvillers - Maçon Ailly sur Noye - cloture Roye - cloture Ham - cloture Chaulnes - cloture Rosieres en santerre - cloture Noyon - cloture Montdidier - cloture Moreuil - cloture Ressons sur Matz - cloture Nesle - cloture Boves - cloture Amiens - cloture 80340 Bray sur somme - cloture Plessier Rozainvillers - cloture Ailly sur Noye - pose de cloture Roye - pose de cloture Ham - pose de cloture Chaulnes - pose de cloture Rosières en santerre - pose de cloture Noyon - pose de cloture Montdidier - pose de cloture Moreuil - pose de cloture 80340 Bray sur somme - pose de cloture Ressons sur Matz - pose de cloture Nesle - pose de cloture Boves - pose de cloture Amiens - pose de cloture Plessier Rozainvillers - pose de cloture Ailly sur Noye
                            </p>
                        </div>
                        <Modal
                            open={this.state.loggerOpened}
                            onClose={this.toggleLogger}
                            size={isSmallDevice ? "large" : "small"}
                        >
                            
                            <div style={Styles.oneEmPadding}>
                                <ListItem
                                    spaceEvenly
                                    notAccepted
                                    title={<p className="silText">LOGIN</p>}
                                    titleStyle={Styles.fontSize(30)}
                                    subTitle={<p className="gotuText">connectez-vous à votre compte Batifis</p>}
                                    subTitleStyle={Styles.beige15}
                                    leftElement={<Image src={transparentLogo} size="small" />}
                                    alignRight="center"
                                    containerStyle={Styles.anthraciteSegment}
                                    contentStyle={Styles.whiteText}
                                />
                                {
                                    loginProcessing || loginError
                                    ? <AutoProgressBar
                                        color={loginError ? 'red' : 'auto'}
                                        completed={loginError || connected}
                                        active={true}
                                        //end={connected}
                                    />
                                    : null
                                }
                                <Form style={Styles.loginFormWrapper}>
                                        <Form.Input
                                            fluid
                                            id='email_field'
                                            label={<p style={Styles.fontSize(18)}>Email</p>}
                                            placeholder='entrez votre adresse email'
                                            type="email"
                                            className="silText"
                                            onChange={this.setEmail}
                                            
                                        />
                                        <Form.Input
                                            fluid
                                            id='pwd_field'
                                            label={<p style={Styles.fontSize(18)}>Mot de passe</p>}
                                            placeholder='entrez votre mot de passe'
                                            type='password'
                                            className="silText"
                                            labelStyle={Styles.fontSize(19)}
                                            onChange={this.setHash}

                                        />

                                    <div className="flexCenter">
                                        <Button onClick={this.login}>
                                            <p className="silText" style={Styles.fontSize(Layout.buttonText)}>Connexion</p>
                                        </Button>
                                    </div>
                                    
                                </Form>

                            
                            </div>
                        </Modal>
                        <Parallax
                            blur={0}
                            bgImage={require('../photo0.jpg')}
                            bgImageAlt="batifis"
                            bgImageStyle={Styles.parallaxBg}
                            strength={Layout.parallaxStrength}
                        >
                            <div style={{height: '50vh'}}>
                                <div className="flexRow flexStart" style={Styles.height30}>
                                    <div className="flexStart spaceAround noWrap" style={Layout.parallaxRow}>    

                                        <div 
                                            className="boldOnHover silText clickable"
                                            style={Styles.whiteText}
                                            //style={{display: 'flex', flex: .5, padding: 10, color: '#fff', fontSize: 18}}
                                            onClick={this.intranetOrLogger}
                                        >
                                            <Icon name={connected ? "user outline" : "id card outline"} color={Colors.white} />
                                        </div>
                                            
                                        <a 
                                            className="boldOnHover silText white clickable"
                                            //style={{display: 'flex', flex: .5, padding: 10, color: '#fff', fontSize: 18}}
                                            href='mailto:contact@batifis.fr'
                    
                                        >
                                            
                                            <Icon name="envelope" color={Colors.white} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Parallax>
                        <div style={Styles.logoSegmentWrapper}>
                            <div style={Layout.logoWrapper}>
                                <Image circular centered size="large" src={transparentLogo/*was logo*/} style={Layout.logoPadding} />
                            </div>
                            <div style={Styles.fullHeightColumn}>
                                <p className="silText" style={Layout.welcomeText}>Au service de votre batiment</p>
                            </div>
                        
                        </div>
                        
                        <div className="gotuTextAll">
                            <Slide left>
                                <div className="silTextAll" id="metier" style={{height: isSmallDevice ? '100vh' : '50vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.batifisBlue, color: Colors.white}}>
                                        <div className="flexCenter" style={{fontSize: Layout.bigTitleText, flex: .3}}>Notre Métier</div>
                                        <div className="flexCenter row spaceEvenly">
                                            {/* <div className="clickable flexHalf row">
                                                <CustomIcon name="wheelbarrow" size={40} />
                                                <ul><li className="silText" style={{fontSize: 25}}>Maçonnerie</li></ul>
                                            </div>
                                            <div className="flexHalf">
                                            // right column ,
                                            </div> */}
                                            {
                                                this.renderCategoriesColumn(0)
                                            }
                                            {
                                                !Layout.isSmallDevice && this.renderCategoriesColumn(1)
                                            }
                                        </div>
                                        {
                                            activeCategory
                                            ? <div className="flexCenter" style={{flex: .2, alignItems: 'flex-end', paddingBottom: 5}}>
                                                <Button className="appButtonWhite" style={Styles.appButtonWhite} onClick={this.resetActiveCategory}>Voir toutes nos réalisations</Button>
                                            </div>
                                            : null
                                        }
                                </div>
                            </Slide>

                            <div id="activeCategory">
                                {
                                    activeCategory
                                    ? <div className="silTextAll flexCenter" style={{height: '100vh', backgroundColor: Colors.white, color: Colors.anthracite, flexDirection: 'column'}}>
                                        <Slide top>
                                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', flex: .1}}>
                                                <p style={{fontSize: Layout.bigTitleText, color: Colors.batifisBlue}}>{activeCategory.title}</p>
                                            </div>
                                            <div style={{flex: .8}}></div>
                                            <div style={{flex: .1}}>
                                                <Button className="appButtonBlue" style={{...Styles.appButtonBlue, width: '90vw', marginTop: 5, marginBottom: '1%'}} onClick={this.goToRealisations}>Voir toutes nos réalisations dans la catégorie {activeCategory.title}</Button>
                                                <CategorySelection />
                                            </div>
                                        </Slide>
                                    </div>
                                    : null
                                }
                            </div>

                            <Slide right>
                                <Fade>
                                    <div id="realisations" style={{height: '100vh'/*isSmallDevice ? '100vh' : '50vh'*/, display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: Colors.batifisGrey, color: Colors.black}}>
                                        <p className="silText" style={{fontSize: Layout.bigTitleText, marginBottom: 0}}>Nos Réalisations {activeCategory ? apostrophe({expression: activeCategory.title, article: "de"}) : ""}</p>
                                        <div style={{padding: '2em'}}>
                                            {/* gallery MUST have 2 modes : activeCategory(state) || all */}
                                            <Carousel 
                                                data={activeCategory ? sortedCarouselData : carouselData} 
                                                removeSource={this.removeImageSource} 
                                                admin={connected} />
                                        </div>  
                                        {
                                            activeCategory
                                            ? <div>
                                                <CategorySelection />
                                            </div>
                                            : <Button 
                                                className="appButtonBlue" 
                                                style={{...Styles.appButtonBlue, width: '90vw', alignSelf: 'center', 
                                                marginBottom: 5}} 
                                                onClick={this.goToCategoriesMenu}
                                                >
                                                    Sélectionner une {activeCategory ? "autre" : ""} catégorie
                                                </Button>

                                        }  
                                    </div>
                                </Fade>
                            </Slide>

                            
                            {/* footer */}
                            <div className="footerWrapper" style={{backgroundColor: Colors.anthracite, color: Colors.white, border: 'solid', borderWidth: 0, borderTopWidth: 1, borderColor: Colors.red}}>
                                <Footer modalOpener={this.log.bind(this)} toggleLogger={this.intranetOrLogger}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
           
        )
    }
}




export default Home
