import React, {Component} from 'react' 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Loader, Image } from 'semantic-ui-react';
import {percentOf, percentage, keyExtractor, ofType} from '../constants/Utils';
import Layout from './Layout';
import BadgeImage from './BadgeImage';
import { randomFrom } from '../constants/Utils'

const getImageAutoWidth = ({width, height, maxHeight, maxWidth}) => {
    const delta = Math.round(percentOf(height - maxHeight, height)) // 396 - 413 = -4
    const autoWidth = Math.round(width - percentage(delta, width))  // 930 - (-4, 930) = 967
    // console.log(`
    // == auto width calculation ==
    // width: ${width}
    // height: ${height}
    // maxHeight: ${maxHeight}
    // maxWidth: ${maxWidth}
    // delta: ${delta}
    // autoWidth: ${autoWidth}
    // `)

    return autoWidth > maxWidth ? maxWidth : autoWidth
}	

const altCities = [
    "roye", "péronne", "Roye", "Péronne", '80200 Péronne', '80700 Roye'
]


/**
 * @dev Props :
 *  - data {array} : provided source data 
 *  - admin {bool} : if true, display an icon on right top border of the slide
 *  - removeSource {fun} : function called to remove one of the source (admin only) 
 */
class Carousel extends Component {

    state = {
        settings: {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }

    removeFromPhotos = (source) => typeof this.props.removeSource === 'function' && this.props.removeSource(source)

    randomCity = () => randomFrom(altCities)

    renderItem = (img) => {
        let autoCity = this.randomCity()
        let key = keyExtractor()
        let badgeWrapWidth = getImageAutoWidth({
            width: img.width,
            height: img.height,
            maxHeight: Layout.height * .7,   // 70vh
            maxWidth: Math.round(Layout.width * .7)
        })
        return this.props.admin === true ? <BadgeImage
            key={key}
            shadow={false}
            className="shadow"
            source={img.source}
            onBadgeClick={() => this.removeFromPhotos(img.source)}
            imageSize={{height: '70vh', width: 'auto', maxWidth: '70vw'}}
            containerStyle={{borderRadius: 10, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
            badgeContainerStyle={{ 
                width: badgeWrapWidth,
                marginBottom: -10,
                zIndex: 2
            }}
        />
        : <div key={key}>
            <Image alt={`réalisation de ${img.categories ? randomFrom(img.categories, {split: ','}) : "Batifis"} à ${autoCity}`} centered className="shadow" src={img.source} style={{height: '70vh', width: 'auto', maxWidth: '70vw', objectFit: 'contain', borderRadius: 5}} />
            <div style={{height: 20}} />
        </div>
        
    }

    render() {
        const {settings} = this.state
        const hasReachedData = ofType(this.props.data) === 'array'
        const hasData = hasReachedData && this.props.data.length > 0
     
        return(
            hasReachedData
            ? (hasData
                ? <div style={{height: '100%'}}>
                    <Slider {...{...settings, dots: this.props.data.length <= 10}}>  {/* maximum 10 dots */}
                        {
                            this.props.data.map(this.renderItem)
                        }
                    </Slider>
                </div>
                : null
            )
            : <Loader active inverted />
        )
    }

}

export default Carousel