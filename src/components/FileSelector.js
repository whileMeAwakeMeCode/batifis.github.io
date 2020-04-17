import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Button } from 'semantic-ui-react'
import Colors from '../constants/Colors'
import Styles from '../constants/Styles'
import BadgeImage from './BadgeImage'

/**
 * 
 * @param props
 */
const Dropzone = ({setFiles: _setFiles}) => {
  
  const onDrop = useCallback(async(acceptedFiles) => {
    function setFiles(fileData) {
      _setFiles(fileData)
    }
    const imageDatasPromises = await Promise.resolve(
      acceptedFiles.map((af) => new Promise((_imageDatas) => {
        const img = new window.Image()
        
        var fr = new FileReader();

        fr.onload = async() => {
          //img.src = await Promise.resolve(fr.result)
          img.src= fr.result

          // wait for img to be read
          setTimeout(async() => {
            const imageDatas = await Promise.resolve({
              name: af.name,
              source: fr.result,
              //width: img.naturalWidth || img.width || ((i) => i.width )(img),
              //height: img.naturalHeight || img.height,
              width: ((i) => i.width)(img),
              height: ((i) => i.height)(img)
            })
  
            //_fileSource(fr.result);
            _imageDatas(imageDatas)
          }, 100)
        }

        fr.readAsDataURL(af);

      }))
    )
    
    const imageDatas = await Promise.all(imageDatasPromises)

    // Do something with the files
    setFiles({acceptedFiles, imageDatas})
    window.scrollTo(0, document.querySelector('#drop_zone').offsetTop)
      
  }, [_setFiles])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div id="drop_zone" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive 
        ? <div className="clickable">
            <Icon name="target" size="huge" />
            <p className="gotuText">Déposez vos fichiers ici</p>
        </div>
        : <div className="clickable">
            <Icon name="download" size="huge" style={{color: Colors.anthracite}} />
            <p className="gotuText anthracite">Glissez vos fichiers, ou cliquez ici pour en sélectionner</p>
        </div>
      }
    </div>
  )
}

/**
 * 
 * @param {object} props
 *  # onSelected {function} files=>{} where typeof files param is array
 *  #categories
 */
const FileSelector = (props) => {
  const defaultFiles = {acceptedFiles: [], imageDatas: []};
  let [files, setFiles] = useState(defaultFiles);

  const removeImage = async(src, name) => {
    const imageDatas = await Promise.resolve(
      files.imageDatas.filter((idta) => idta.source !== src)
    )
    // todo : remove from acceptedFiles
    const acceptedFiles = await Promise.resolve(
      files.acceptedFiles.filter((af) => af.name !== name)
    )
    setFiles({acceptedFiles/*: files.acceptedFiles*/, imageDatas})
  }

  const sendImages = () => {
    if (props && typeof props.onSelected === 'function') {
      props.onSelected({files, resetFiles}) // ({acceptedFiles, imageDatas}, resetFiles) 
    } else console.error('FileSelector > sendImages > error : invalid "onSelected" prop')
  }

  const resetFiles = () => setFiles(defaultFiles)
 

  const renderImage = ({source, name}) => <BadgeImage
    source={source}
    onBadgeClick={() => removeImage(source, name)}
  />
  
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
              files.imageDatas.length ? files.imageDatas.map(renderImage) : null
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