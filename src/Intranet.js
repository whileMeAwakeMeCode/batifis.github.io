import React, {useState} from 'react';
import FileSelector from './FileSelector';
import AutoProgressBar from './AutoProgressBar';
import Api from './constants/Api';
import { Dropdown } from 'semantic-ui-react';
import Layout from './Layout';
import Colors from './constants/Colors';


// Photos Uploader UI
class Intranet extends React.Component { 
    defaultState = {
        categories: null,           // {array} selected categories for image group
        completed: false,           // {bool} upload progress is completed
        incrementation: 50,         // {number} timeout for auto progress bar
        uploadingFiles: false,      // {bool} indicate that files are being uploded
        color: 'auto'               // {enum} color of the auto progress bar
    }

    state = this.defaultState
   

    resetIntranet = () => {
        console.log(' ---> resetting intranet view...')
        this.setCategorySelectorValue(null)
        this.setState(this.defaultState)
    }

    CategorySelector = () => {
        let [value, setValue] = useState(null)
        this.setCategorySelectorValue = setValue.bind(this)
                    
        return <div className="flexCenter column" style={{height: '100%', backgroundColor: Colors.batifisBlue, color: Colors.white}}>
            <p className="flexCenter silText" style={{fontSize: Layout.bigTitleText, paddingTop: 10}}>Sélectionnez les catégories correspondantes au groupe d'images</p>
            <div className="flexCenter" style={{width: '100vw', height: 50}}>
                <Dropdown 
                    style={{width: '80vw', marginBottom: 10}} 
                    multiple 
                    selection 
                    placeholder='catégorie'
                    options={this.props.categories}
                    value={value}
                    onChange={(event, data) => setValue(data.value)} 
                    onClose={() => this.setCategories(value)}
                />
            </div>
        </div>
    }
    
    onImagesSelected = async({files:_files, resetFiles}) => {
    
        // do not allow upload is no categories set
        this.state.categories && this.state.categories.length
        ? (async() => {    
            window.scrollTo(0, 0);
            const {acceptedFiles: files} = _files

            // indicate storage in progress
            await this.setState({uploadingFiles: true, incrementation: files.length * 10})
               
            // store to S3 via API
            const upload = await Api.upload(files, this.state.categories)

            if (upload.status === 200) {
                // indicate storage process success
                this.setState({completed: true})
                // wait 1.5scd before setting progress bar to inactive
                setTimeout(() => {
                    const s = files.length > 1 ? "s" : ""
                    this.setState({uploadingFiles: false})
                    this.props.log({
                        title: 'Succès',
                        titleStyle: {color: 'green'},
                        message: `${files.length} image${s} enregistrée${s}`,
                        icon: 'check',
                        iconColor: "green",
                        maxStay: 3000,
                        styleSheet: {textAlign: 'center'},
                        onClose: this.resetIntranet.bind(this) 
                    })
                    resetFiles()
                }, 1500)

            } else {
               
                this.setState({completed: true, color: 'red'})

                this.props.log({
                    title: 'Erreur',
                    titleStyle: {color: 'red'},
                    message: upload.error || "Il y a eu une erreur lors de l'enregistrement de vos images. Veuillez réessayer, si le problème persiste, vérifiez votre connexion au réseau ou contactez le support",
                    icon: 'close',
                    iconColor: "red",
                    stay: true,
                    closeButton: true,
                    styleSheet: {textAlign: 'center'}

                })

                setTimeout(() => {
                    this.resetIntranet()
                }, 1000)
            }

        })()
        : this.props.log({
            title: 'Petit oubli...',
            titleStyle: {color: Colors.black},
            message: "Veuillez sélectionner au moins une catégorie",
            messageStyle: {fontSize: Layout.titleText},
            icon: 'warning sign',
            iconColor: "orange",
            stay: true,
            closeButton: true,
            closeText: "Ok",
            styleSheet: {textAlign: 'center'}

        });
       
    }


    setCategories = (categories) => this.setState({categories})

    render() {

        const {incrementation, completed, color, uploadingFiles, categories} = this.state
        const CategorySelector = this.CategorySelector
        return (
            <div>
                {
                    !uploadingFiles
                    ? null
                    : <AutoProgressBar
                        color={color || 'auto'}
                        completed={completed}
                        incrementation={incrementation}
                        active={uploadingFiles}
                    />
                }
                <CategorySelector />
                <FileSelector onSelected={this.onImagesSelected} categories={categories} />
            </div>
        )
    }

}

export default Intranet


