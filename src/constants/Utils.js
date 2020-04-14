
const Utils = {
    keyExtractor : () => Math.floor(Math.random() * (10000000000)),
    isJSON : (supJSON) => {
        try {
            let json = JSON.parse(supJSON) 
            return json
    
        } catch(err) {
            return(false)
        }
    },
    ofType : (any) => {
        let t = typeof any
        return(
            t !== 'object'
            ? t
            : (
                t.length
                ? 'array'
                : t
            )
        )
    }
}

export default Utils