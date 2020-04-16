import React, {Component} from 'react' 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Loader } from 'semantic-ui-react';
import Utils from '../constants/Utils';
import Layout from './Layout';
import BadgeImage from './BadgeImage';

const getImageAutoWidth = ({width, height, maxHeight, maxWidth}) => {
    const delta = Math.round(Utils.percentOf(height - maxHeight, height)) // 396 - 413 = -4
    const autoWidth = Math.round(width - Utils.percentage(delta, width))  // 930 - (-4, 930) = 967
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


    renderItem = (img) => {
        
        const badgeWrapWidth = getImageAutoWidth({
            width: img.width,
            height: img.height,
            maxHeight: Layout.height * .7,   // 70vh
            maxWidth: Math.round(Layout.width * .7)
        })
        return <BadgeImage
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
    }

    render() {
        const {settings} = this.state
        const hasReachedData = Utils.ofType(this.props.data) === 'array'
        const hasData = hasReachedData && this.props.data.length > 0
     
        return(
            hasReachedData
            ? (hasData
                ? <div>
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