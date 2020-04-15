import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Divider, Segment, Image, Icon, Button } from 'semantic-ui-react'
import Colors from './constants/Colors'
import Styles from './constants/Styles'

const Dropzone = (props) => {
    
  const onDrop = useCallback(async(acceptedFiles) => {
    
    const fileSourcesPromises = await Promise.resolve(
      acceptedFiles.map((af) => new Promise((_fileSource) => {

        var fr = new FileReader();
        fr.onload = () => {
          _fileSource(fr.result);
        }
        fr.readAsDataURL(af);

      }))
    )
    
    const fileSources = await Promise.all(fileSourcesPromises)

   // console.log('fileSources', fileSources)

    // Do something with the files
    props.setFiles({acceptedFiles, fileSources})

  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive 
        ? <div className="clickable">
            <Icon name="target" size="huge" />
            <p className="gotuText">Déposez vos fichiers ici</p>
        </div>
        : <div className="clickable">
            <Icon name="download" size="huge" />
            <p className="gotuText">Glissez vos fichiers, ou cliquez ici pour en sélectionner</p>
        </div>
      }
    </div>
  )
}

/**
 * 
 * @param {object} props
 *  # onSelected {function} files=>{} where typeof files param is array
 */
const FileSelector = (props) => {
  const defaultFiles = {acceptedFiles: [], fileSources: []};
  let [files, setFiles] = useState(defaultFiles);

  const removeImage = async(file) => {
    const fileSources = await Promise.resolve(
      files.fileSources.filter((f) => f !== file)
    )
    // todo : remove from acceptedFiles
    setFiles({acceptedFiles: files.acceptedFiles, fileSources})
  }

  const sendImages = () => {
    if (props && typeof props.onSelected === 'function') {
      props.onSelected({files, resetFiles}) // ({acceptedFiles, fileSources}, resetFiles) 
    } else console.error('FileSelector > sendImages > error : invalid "onSelected" prop')
  }

  const resetFiles = () => setFiles(defaultFiles)

  const renderImage = (f) => <div 
    className="shadow" 
    style={{padding: 10, margin: 20, border: `solid 1px ${Colors.anthracite}`, borderRadius: 10, backgroundColor: Colors.white}}
  >
    <span className="clickable" style={{display: 'flex', flex: '1', justifyContent: 'flex-end', marginTop: -25, marginRight: -25}} onClick={() => removeImage(f)}>
      <Icon circular inverted color="blue" name="close" />
    </span>
    <Image src={f} style={{height: '30vh', width: 'auto', maxWidth: '45vw', objectFit: 'contain', borderRadius: 5}} />
  </div>
  
  return(
    <div className="flexCenter" style={{flexDirection: 'column', height: '100vh', backgroundColor: Colors.anthracite}}>
      {/* {
        props.categories
        ? <h4 style={{flex: .1}} className="white silText" style={{padding: 10, fontSize: 25}}>Vos images dans {props.categories.length > 1 ? 'les categories' : 'la catégories'} {props.categories.map((c) => c.title).join(', ')}</h4>
        : null
      } */}
      <div className="flexCenter" style={{flex: .2, width: '100vw', backgroundColor: Colors.white}}>
        <Dropzone setFiles={setFiles.bind(this)} />
      </div>
      <div className="flexCenter" style={{flex: /* props.categories ? .7 :  */.8, overflow: 'scroll'}}>
        <div className="flexRow wrap" style={{width:'100vw', backgroundColor: Colors.anthracite, justifyContent: 'center'}}>
            {
              files.fileSources.length ? files.fileSources.map(renderImage) : null
            }
        </div>
      </div>

      <Button className="appButtonBlue" style={{...Styles.appButtonBlue, width: '90vw'}} onClick={sendImages}>
        Valider
        <Icon name="check" />
      </Button>        
    </div>
  )

}

export default FileSelector