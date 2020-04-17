import cryptoJSON from 'crypto-json'
import { isJSON } from '../constants/Utils'
const JSON_algorithm = 'camellia-128-cbc'    
const encoding = 'hex'
const JSON_encrypt_pwd = "sdf45$TG34F9_34xD€24f9/j94FJZXg349J02x"


/**
* @dev responsible for verifying that client[keys] parsed version of an originally stringified nested object doesnt contain any nested stringified object that should be rendered as a plain object
* @param obj the object to test (MAY be a Client object)
*/
const noJSONStrings = (obj) => {
   return new Promise(async (resolve, reject) => {
       var newObj = {}

       try {
           //report('verify that nested keys doesnt contain any JSON type', obj, {then:'check JSON value, map object keys'})
           var keys = Object.keys(obj);
           var keysMapped = await new Promise((mapped) => {
               keys.map(async (key, i) => {

                   // check if obj[key] value has a JSON type 
                   var hasJSONValue = await new Promise((res) => {res(isJSON(obj[key]))});
                   

                   newObj[key] = await new Promise((res) => {
                       res(
                           hasJSONValue ?              
                           JSON.parse(obj[key]) :
                           obj[key]
                       )
                   })

                   if (i+1 === keys.length) {
                       mapped(newObj)

                   }
               })
           })

           var newKeysLen = Object.keys(keysMapped).length

           if (newKeysLen === keys.length)
               resolve(newObj)
           // computation failsafe
           else reject('* noJSONStrings FAILSAFE ERROR: lengths doesn\'t match *')


       } catch(err) {
           console.error(err);
           reject(err);
       }
   })
}

/**
* @dev verify if client[key] is well stringified: has no nested object that is not stringified (stringify if needed)
* @param obj the Client[key] to check clean stringifization of
* @param keys an array of obj keys
* @return a clean stringified Client[key]
* @notice tests if toEncrypt doesn't contain any nested object
*/
const stringifyKeys = (obj, keys) => {
   return new Promise((resolve, reject) => {
   
       let newObj = {}
       
       keys.forEach((key) => {
           if (key) {
               newObj[key] = 
               Object.keys(obj[key]) ?
               JSON.stringify(obj[key]) : 
               obj[key]
           }
       })

       setTimeout(() => {
           resolve(newObj)
       })
   })
}

export default {
    
    /**
     * @dev ENCRYPT an object {} or string ""(will be computed in an object)
     * @param toEncrypt the object/string to encrypt
     * @param returnString *opt* if true, and cryptedOutput.is_a_string, will return a literral encoded string iso {is_a_string: ENCODED}
     * @notice any toEncrypt[key] must be stringified if the object is nested inside another object {key: value, key : {nestedKey : nestedValue}, key : value}
     * @notice if toEncrypt has a string type, it will be computed as {main: toEncrypt} for encryption and returned as regular litteral string by decrypt()
     */
    encrypt : (toEncrypt, returnString) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!toEncrypt) reject('* Encrypt JSON Error: invalid provided object *')
                else {
                    // check if toEncrypt is a string, build an object from it
                    // if (typeof toEncrypt === 'string') {
                    if (typeof toEncrypt !== 'object') {
                        toEncrypt = Object({is_a_string : toEncrypt})
                    } 
                    
                    let keys = await new Promise((keysOk) => { keysOk(Object.keys(toEncrypt)) });
    
                    /*  /!\ IMPORTANT: any nested object must be stringified /!\  */
                    // check that toEncrypt doesnt contain any nested object
                    let nestedStringified = await stringifyKeys(toEncrypt, keys);
                    //report('nestedStringified', nestedStringified, {inspect:true,step:'verify that every nested objects have been stringified'})
    
                    let cryptedOutput = await Promise.resolve(
                        cryptoJSON.encrypt(
                            nestedStringified, JSON_encrypt_pwd, {encoding, keys, JSON_algorithm}
                        )    
                    )

                    resolve(
                        returnString && cryptedOutput.is_a_string
                        ? cryptedOutput.is_a_string
                        : cryptedOutput
                    );
                }
        
                
            } catch(err) {
                reject(err)
            }
    
        })
    },
    
    
    /** @notice /!\ IMPORTANT /!\
    * THINK TO JSON.PARSE any object that is nested (inside another object) as it has been stringified before encryption:
    * eg.:  JSON.parse(decrypted.configFile).purchasedVersion
    */
    /**
     * @dev Decrypt any JSON object 
     * @param cryptedObj the object to decrypt
     * @notice any cryptedObj[key] that is nested inside another object {key: value, key : {nestedKey : nestedValue}, key : value} must be parsed
     */
    decrypt : (cryptedObj) => {
        return new Promise(async (resolve, reject) => {
            try {
                let decryptedOutput = await Promise.resolve(
                    cryptoJSON.decrypt(
                        cryptedObj, JSON_encrypt_pwd, {encoding, JSON_algorithm}
                    )
                )

                // if cryptedObj has been encrypted as a string
                if (decryptedOutput.is_a_string) {
                    resolve(decryptedOutput.is_a_string);
                }
                else {  // check
                    let _noJSONString = await noJSONStrings(decryptedOutput);
                    resolve(_noJSONString)
    
                }
    
            } catch(err) {
                console.error(err)
                reject(err)
            }
        })
    }
}