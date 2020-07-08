/* Packages */
import React, {Component} from 'react'
import { Parallax } from 'react-parallax'
import {Image, Modal, Form, Button, Icon, Dimmer} from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'

// effects
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';   

/* Components*/
import AutoProgressBar from './AutoProgressBar'
import ListItem from './ListItem'
import Log from './Log'
import Carousel from './Carousel'
import Intranet from './Intranet'
import Footer from './Footer';
import CustomIcon from './CustomIcon';
import { Seo, keywords } from './Seo';

/* Constants */
import layout from './Layout'
import Api from '../constants/Api'
import { protectImages, listenOrientation } from '../constants/StartUpEvents'
import { apostrophe, randomFrom } from '../constants/Utils'
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { altCities } from '../constants/constants'
import Crypto from './Crypto';

/* Images */
import transparentLogo from '../images/transparentLogo.png';

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
        // const MehmetHash = await Crypto.encrypt(`batifice@laposte.net::Yusufallan3129`, true)
        // alert(MehmetHash)
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
            const hash = await Crypto.encrypt(`${email}::${pwd}`, true)

            const isAdm = await Api.login(hash);
            console.log('isAdm', {isAdm, type: typeof isAdm})
            this.setState({connected: isAdm, loginProcessing: isAdm || false, loginError: !isAdm})
            
            setTimeout(() => {
                //let msgIcon, msg;

                if (isAdm) {
                    this.toggleIntranet()
                    this.setSnack({
                        message: 'Vous êtes connecté',
                        closeIcon: 'check',
                        duration: 2500
                    })
                
                } else {
                   
                    this.setSnack({
                        message: 'Connexion refusée',
                        icon: 'exclamation'
                    })
                   
                } 

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
                {...log}
                maxStay={maxStay}        
                closed={typeof message === 'undefined'} 
                classAttribute={classAttribute || "centered"}
                logMethod={this.log.bind(this)}
            />
            : null
        )
    }

    closeSnack = () => this.setState({snack: false})

    
    maybeDisplaySnack = () => {
        const {snack} = this.state;
        const { Action: _Action, closeIcon, duration, message, onIconClick, onClose } = snack || {}
        
        const clickHandler = onIconClick ? () => { this.closeSnack(); onIconClick(); } : this.closeSnack
        const Action = () => closeIcon ? <Icon className={onIconClick ? 'clickable' : ''} name={closeIcon} onClick={clickHandler} /> : () => _Action
        return (
            snack 
            ? <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={true}
                autoHideDuration={duration || 6000}
                onClose={typeof onClose === 'function' ? () => { this.closeSnack(); onClose(); } : this.closeSnack} 
                message={message}
                action={
                    Action
                    ? <React.Fragment>
                        <Action />
                    </React.Fragment>
                    : null
                }
            />
        
            : null
        )
    }

    /**
     * @dev snack {object} 
     *  - message
     *  - duration {number} *option* (default: 6000)
     *  - icon {string} *option* 
     *  - onIconClick {fun} *option* handler for icon click event (will be fired after the snackbar close)
     *  - Action {Component} *option* (will overwrite the icon prop)
     */
    setSnack = (snack => this.setState({snack})).bind(this)

    scrollTo = (route) => {
        window.location.href = `/#${route}`
    }

    goToCategoriesMenu = () => this.scrollTo('metier')
    goToRealisations = () => this.scrollTo('realisations')

    sortRealisationsByCategory = async(catKey, _carouselData/*opt*/) => {
        const carouselData = _carouselData || this.state.carouselData
        //console.log('carouselData', carouselData.map((cd) => cd.categories.indexOf(catKey) >= 0))
        let carouselDataSorting = await Promise.resolve(
            carouselData.map((cd) => cd.categories.indexOf(catKey) >= 0)
        )

        let sortedCarouselData = await Promise.resolve(
            carouselData.filter((cd, cdi) => carouselDataSorting[cdi])    
        )
        
        this.setState({
            sortedCarouselData, 
            ...(_carouselData ? {carouselData} : {})
        });

        (
            !carouselData.length 
            || !sortedCarouselData.length
        ) 
        && this.scrollTo('activeCategory');
        
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
                const { data: carouselData } = removal;
                const { activeCategory, sortedCarouselData } = this.state
                const { key } = activeCategory || {};

                key 
                ? this.sortRealisationsByCategory(key, carouselData)
                : this.setState({carouselData});

                this.setSnack({
                    message: "l'image a été supprimée",
                    closeIcon: 'check',
                })


            } else throw(Error(`removal operation failed with status ${removal.status}`))

        }catch(e) {
            console.log('removeImageSource error', e)
            this.setSnack({
                message: 'Il y a eu une erreur lors de la suppression de votre image, veuillez réessayer. Si le problème persiste, contactez le support',
                closeIcon: 'close',
            })
           
        }
    }

    randomCity = () => randomFrom(altCities)


    render() {
        const {isSmallDevice} = Layout
        const {loginProcessing, connected, activeCategory, loginError, displayIntranet, carouselData, sortedCarouselData, forbiddenOrientation} = this.state
        const CategorySelection = () => <Button className="appButtonBlue" style={Styles.largeAppBlueButton} onClick={this.goToCategoriesMenu}>Sélectionner une autre catégorie</Button>;
        const usedCarouselDataLength = sortedCarouselData && sortedCarouselData.length && sortedCarouselData.length.toString()
        return(
            <div>
                <Seo 
                  title="default"
                  description="Entreprise du batiment dans la somme. Découvrez nos travaux de rénovation, construction, maçonnerie, carrelage, isolation, peinture. Devis gratuit"
                />
                <Modal dimmer='blurring' size='mini' open={forbiddenOrientation} style={{textAlign: 'center'}} ><Modal.Header><Icon name="warning" />Oups</Modal.Header><Modal.Content>Veuillez revenir en mode portrait</Modal.Content></Modal>
                {this.maybeLogMsg()}
                {
                    displayIntranet
                    ? <Intranet setSnack={this.setSnack} categories={this.categoriesOptions} closeIntranet={this.closeIntranetUpdateList.bind(this)} />
                    : <div style={{zIndex: 1}}>
                        <div key="metas" style={Styles.invisible}>
                            <p className="unselectable tt">
                                {keywords}
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
                                    leftElement={<Image src={transparentLogo} size="small" alt=" " />}
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
                            bgImageAlt="maçonnerie construction peinture enduit isolation péronne roye"
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
                                <Image circular centered size="large" src={transparentLogo/*was logo*/} style={Layout.logoPadding} alt=" "/>
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
                                            activeCategory && carouselData && carouselData.length
                                            ? <div className="flexCenter" style={{flex: .2, alignItems: 'flex-end', paddingBottom: 5}}>
                                                <Button className="appButtonWhite" style={Styles.appButtonWhite} onClick={this.resetActiveCategory}>Voir toutes nos réalisations ({carouselData.length})</Button>
                                            </div>
                                            : null
                                        }
                                </div>
                            </Slide>

                            <div id="activeCategory">
                                {
                                    activeCategory
                                    ? <div className="silTextAll flexCenter" style={{height: '100vh', backgroundColor: Colors.white, color: Colors.anthracite, flexDirection: 'column'}}>
                                      
                                        <Seo 
                                            title={`Batifis, ${activeCategory.title} : nos réalisations`}
                                            description={`Exemple de réalisation Batifis : travaux ${apostrophe({expression: activeCategory.title, article: "de"})} à ${this.randomCity()}`}
                                        />
                                        <Slide top>
                                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', flex: .1}}>
                                                <p style={{fontSize: Layout.bigTitleText, color: Colors.batifisBlue}}>{activeCategory.title}</p>
                                            </div>
                                            <div style={{flex: .8}}></div>
                                            <div style={{flex: .1}}>
                                                {
                                                    usedCarouselDataLength
                                                    ? <Button className="appButtonBlue" style={{...Styles.appButtonBlue, width: '90vw', marginTop: 5, marginBottom: '1%'}} onClick={this.goToRealisations}>Voir toutes nos réalisations dans la catégorie {activeCategory.title} ({usedCarouselDataLength})</Button>
                                                    : null
                                                }
                                                <CategorySelection />
                                            </div>
                                        </Slide>
                                    </div>
                                    : null
                                }
                            </div>

                            {
                                (
                                    activeCategory ? (sortedCarouselData && sortedCarouselData.length) : true
                                ) 
                                ? <Slide right>
                                    
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
                                : null
                            }

                            
                            {/* footer */}
                            <div className="footerWrapper" style={{backgroundColor: Colors.anthracite, color: Colors.white, border: 'solid', borderWidth: 0, borderTopWidth: 1, borderColor: Colors.red}}>
                                <Footer modalOpener={this.log.bind(this)} toggleLogger={this.intranetOrLogger} />
                            </div>
                        </div>
                    </div>
                }

                {
                    this.maybeDisplaySnack()
                }

            </div>
           
        )
    }
}




export default Home
