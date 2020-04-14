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
    upload : async(files, categories) => {
        try {
            console.log(` ---> trying to upload ${files.length} files...`, files)

            const data = await new Promise(async(resolve,reject)=>{
                let formData = new FormData();
                formData.append('categories', categories)
            
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