

    module.exports.keyExtractor = () => Math.floor(Math.random() * (10000000000))
    module.exports.isJSON = (supJSON) => {
        try {
            let json = JSON.parse(supJSON) 
            return json
    
        } catch(err) {
            return(false)
        }
    }
    module.exports.ofType = (any) => {
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
    module.exports.percentOf = (part, total) => (100 / (total / part))	// (4, 16) = 25
    module.exports.percentage = (percent, number) => (
        (number / 100) * percent
    )
    module.exports.apostrophe = ({expression, article}) => {
        const vowels = 'aeiou'
      return vowels.indexOf(expression.toLowerCase().charAt(0)) >= 1 ? `${`${article.charAt(0)}'`}${expression}` : `${article} ${expression}`
    }


