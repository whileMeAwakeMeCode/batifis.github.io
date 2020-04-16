import Axios from 'axios'

const API_URL_PROD = "https://batifis.herokuapp.com"
const API_URL_DEV = "http://localhost:3001"

const Api = {

    get : async(dirName) => {
        try {
            const url = await Promise.resolve(`${API_URL_DEV}/${dirName}`)
            console.log(` ---> trying to get ${dirName} from url ${url}`)

            const fetchResponse = await fetch(url, {method: 'GET'})
            const data = await fetchResponse.json()

            return data

            // const img = "https://batifis.s3.eu-west-3.amazonaws.com/photos/logo.png"
            // return [url]
           
        }catch(e) {
            console.error(e || 'Api get error')
            return []
        }
    },
    /**
     * @param {Array} files : an array of File object to pass to api/upload post handler (will compute a FormData object)
     */
    upload : async(files, imageDatas) => {
        try {
            console.log(` ---> trying to upload ${files.length} files...`, files)
            const data = await new Promise(async(resolve,reject)=>{
                let formData = new FormData();
            
                files.forEach(async(value,index) => {
                    console.log(' ---> appending value', value)
                    await Promise.resolve(
                        formData.append('fileData', files[index])
                    )
                    if(index===files.length-1){
                        console.log('*exiting*', formData)
                        resolve(formData);
                    }
                })
            })

            const noB64ImagesDatas = await Promise.resolve(imageDatas.map((idta) => ({...idta, source: null})))
            data.append('imageDatas', JSON.stringify(noB64ImagesDatas))


            console.log(' ---> upload data', data)

            const axiosResponse = await Axios({
                method: "post",
                url: `${API_URL_DEV}/upload`,
                data,   // FormData
                config: { headers: { "Content-Type": "multipart/form-data" } }
            })

            console.log(' ---> upload axiosResponse', axiosResponse)

            return axiosResponse

        }catch(e) {
            console.log('Api put error', e)
            return false
        }
    },

    remove : async(source) => {
        try {
            console.log('trying to remove source', source)
            const axiosParams = await Promise.resolve({
                method: "post",
                url: `${API_URL_DEV}/remove`,
                data: { source },   // FormData
                //config: { headers: { "Content-Type": "application/json" } }
            })

            const axiosResponse = await Axios(axiosParams)


            return axiosResponse
        }catch(e) {
            const errMsg = `Api -> remove error : error while removing source ${source}`
            console.error(errMsg, e)
            throw(errMsg)
        }
    }

}

export default Api


/* 
    PHOTO UPLOAD : 
    Axios({
        method: "post",
        url: `${process.env.API_URL}/upload`,
        data,   // FormData
        config: { headers: { "Content-Type": "multipart/form-data" } }
    })

*/