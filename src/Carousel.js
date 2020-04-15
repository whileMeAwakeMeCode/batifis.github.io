import React, {Component} from 'react' 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image, Loader } from 'semantic-ui-react';
import Utils from './constants/Utils';
import BadgeImage from './BadgeImage';

class Carousel extends Component {

    state = {
        settings: {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }

    removeFromPhotos = () => {
        //set progress bar on top of "Réalisation title"
    }

    // renderItem = (img) => {
    //     console.log(' ---> renderItem img', img)
    //     return <div style={{height: '70vh'}}><Image centered src={img.source} style={{height: '70vh', width: 'auto', maxWidth: '70vw', objectFit: 'contain'}} /></div>
    // }

    renderItem = (img) => {
        console.log(' ---> render slide img', img)
        
        const width = '50%'
        
        return <BadgeImage
            shadow={false}
            className="shadow"
            source={img.source}
            onBadgeClick={() => this.removeFromPhotos(img.source)}
            imageSize={{height: '70vh', width: 'auto', maxWidth: '70vw'}}
            containerStyle={{borderRadius: 10, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
            badgeContainerStyle={{width}}
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
                    <Slider {...{...settings, dots: this.props.data.length < 10}}>  {/* maximum 10 dots */}
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