

    export const keyExtractor = () => Math.floor(Math.random() * (10000000000))
    export const isJSON = (supJSON) => {
        try {
            let json = JSON.parse(supJSON) 
            return json
    
        } catch(err) {
            return(false)
        }
    }
    export const ofType = (any) => {
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
    export const percentOf = (part, total) => (100 / (total / part))	// (4, 16) = 25
    export const percentage = (percent, number) => (
        (number / 100) * percent
    )
    export const apostrophe = ({expression, article}) => {
        const vowels = 'aeiou'
      return vowels.indexOf(expression.charAt(0)) >= 1 ? `${`${article.charAt(0)}'`}${expression}` : `${article} ${expression}`
    }


