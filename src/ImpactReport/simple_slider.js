import React from 'react';
import Slider from 'react-slick';

export default class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let { images, onImageSelect } = this.props;
    var settings = {
      // dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          // dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }]
    };
    return (
      <Slider {...settings}>
        {images.map((photo) => {
          var source = '/img/' + photo.image;
          return <div key={photo.image} className="carousel_img" onClick={(e) => onImageSelect(photo)}><img src={source} /></div>;
        })}
      </Slider>
    );
  }
};