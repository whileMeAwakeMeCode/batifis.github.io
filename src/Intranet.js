import React, {useState} from 'react';
import FileSelector from './FileSelector';
import AutoProgressBar from './AutoProgressBar';
import Api from './constants/Api';
import { Dropdown } from 'semantic-ui-react';
import Layout from './Layout';


const CategorySelector = ({categories, onSelected}) => {
    let [value, setValue] = useState(null)

    const categoriesOptions = ({key, title}) => ({key: key, text: title, value: {key, title}}) 
    const getOptions = () => (
        categories
        .map(categoriesOptions)
        .filter((c) => JSON.stringify(value||" ").indexOf(c.key) < 0)
    );

    return <div className="flexCenter column" style={{height: '100%'}}>
        <p className="flexCenter" style={{fontSize: Layout.bigTitleText}}>Sélectionnez les catégories correspondantes au groupe d'images</p>
        <div className="flexCenter" style={{width: '100vw', height: 50}}>
            <Dropdown 
                fluid 
                multiple 
                selection 
                placeholder='catégorie'
                options={getOptions()} onChange={(_, {value}) => {console.log('setting value', value); setValue(value)} } onClose={() => onSelected(value)}
            />
        </div>
    </div>
}

// Photos Uploader UI
const Intranet = (props) => {
    let [categories, setCategories] = useState(null)
    let [completed, setCompleted] = useState(false)
    let [incrementation, setIncrementation] = useState(50)
    let [uploadingFiles, setUploadingFiles] = useState(false)
    let [color, setColor] = useState('auto')

    const resetIntranet = () => {
        console.log(' ---> resetting intranet view...')
        setCategories(null);
        setCompleted(false);
        setColor('auto')
    }
    
    const onImagesSelected = (_files) => {
        const {acceptedFiles: files/*, fileSources*/} = _files

        console.log(' ---> selected files ', files.length)

        // calculate the loading time
        setIncrementation(files.length * 10) // 30ms / file estimated

        // wait for incremention to be set
        setTimeout(async() => {      
            // indicate storage in progress
            setUploadingFiles(true)

            // store to S3 via API
            const upload = await Api.upload(files, categories)
            console.log('upload', upload)

            if (upload.status === 200) {
                // indicate storage process success
                setCompleted(true)
                // wait 1scd before setting progress bar to inactive
                setTimeout(() => {
                    const s = files.length > 1 ? "s" : ""
                    setUploadingFiles(false);
                    props.log({
                        title: 'Succès',
                        titleStyle: {color: 'green'},
                        message: `${files.length} image${s} enregistrée${s}`,
                        icon: 'check',
                        iconColor: "green",
                        maxStay: 3000,
                        styleSheet: {textAlign: 'center'},
                        onClose: resetIntranet.bind(this) 
                    })
                }, 1000)

            } else {
                setColor('red')
                setCompleted(true)
                props.log({
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
                    setUploadingFiles(false);
                    setCompleted(false)
                    setColor('auto')
                }, 1000)
            }

        })
       
    }

    const uploadEnded = () => {
        // file upload has ended event
        console.log(' ---> upload has ended')

    }

    return (
        <div>
            {
                !uploadingFiles
                ? null
                : <AutoProgressBar
                    color={color || 'auto'}
                    completed={completed}
                    incrementation={incrementation}
                    //incrementEvery={incrementation * 10}
                    //hide={!uploadingFiles}
                    active={uploadingFiles}
                    onCompleted={uploadEnded}
                />
            }
            {/* <AutoProgressBar
                color={color || 'auto'}
                completed={completed}
                incrementation={incrementation}
                //incrementEvery={incrementation * 10}
                //hide={!uploadingFiles}
                active={uploadingFiles}
                onCompleted={uploadEnded}
            /> */}
            {
                categories
                ? <FileSelector onSelected={onImagesSelected} categories={categories} />
                : <CategorySelector categories={props.categories} onSelected={setCategories} />
            }
        </div>
    )

}

export default Intranet



/* onImageSelected mockup */
// setTimeout(() => setUploadingFiles(true))
// setTimeout(() => {

//     setCompleted(true)
//     setTimeout(() => {
//         setUploadingFiles(false)
//     }, 1500)
// }, 8000)