import React from 'react';
import Slider from 'react-slick';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import PieChart from 'react-simple-pie-chart';

export default function SimpleMap (props) {
  return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: '500px',
              width: '50%',
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={17}
            defaultCenter={{ lat: 43.6465, lng: -79.4637 }}
            onClick={props.onMapClick}
          >
            {props.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={() => props.onMarkerRightclick(index)} />
              );
            })}
          </GoogleMap>
        }
      />
    </section>
  );
}

class SimpleSlider extends React.Component {
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
        {images.map((image) => {
          var source = '/img/' + image;
          return <div key={image} className="carousel_img" onClick={(e) => onImageSelect(image)}><img src={source} /></div>;
        })}
      </Slider>
    );
  }
};

export default class ImpactReport extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      images: [
        'humber1.jpg', 'humber3.jpg', 'humber4.jpg', 'humber5.jpg', 'humber6.jpg', 'humber7.jpg'
      ],
      activeImage: 'humber1.jpg',
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
    }
    this._onImageSelect = this._onImageSelect.bind(this);
  }

  _onImageSelect(newImage) {
    this.setState({ activeImage: newImage });
  }

  render () {
    return (
      <div className="container my-app">
        <section className="report-head">
          <h3 className="report-heading">Walk Story | Impact Report</h3>
          <a className="audio-toggle">
            <i className="fa fa-volume-up" aria-hidden="true"></i>Audio ON/OFF
          </a>
          <a className="print-btn">Print Report</a>
        </section>
        <main className="report-walk-story">
          <section className="walk-story">
            <h1 className="story-title">Where to Watch Salmon on the Don</h1>
            <p className="walk-creators">
              A Jane's Walk by: Sook Chang & Denise Pinto 
              <span className="hint-text"> 
                [<a className="walk-link" href="#">What's a Jane's Walk?</a>]
              </span>
            </p>
            <p className="walk-journalists">
              Impact Report written by Walk Journalists Nico & Josh 
              <span className="hint-text"> 
                [<a className="walk-link" href="#">What's a Walk Journalist?</a>]
              </span>
            </p>
            <p className="walk-story-info">
              Cummer Community Centre | Language(s): English, Korean | March 19, 2016, 2:00 PM, 2 hours
            </p>
            <div className="walk-photo">
              <img src={`/img/${this.state.activeImage}`}/>
            </div>
            <p className="walk-photo-desc">
              Above: Walk leader, Sook Chang, shows residents a prime salmon spotting area. "This is 
              the first spot I brought my friends from South Korea. Not to Niagara Falls or other tourist
              places. This is something they would never see back home."
            </p>
            <div className="carousel_container">
              <SimpleSlider {...this.state} onImageSelect={this._onImageSelect} />
            </div>
          </section>
          <section className="walk-details">
            <h3 className="walk-section-heading">What This Walk Was About</h3>
            <p>
              This walk took old and new neighbours alike into a ravine to explore stories of the ravine
              system from the eyes of a new immigrant, including where salmon can be spotted in the fall.
            </p>
            <p>
              <span className="hint-text">
                [See another walk in this series: <a className="walk-link" href="#">Humber Trail Walk</a>]
              </span>
            </p>
            <h4 className="map-instructions story-sub-subheading">
              Mouseover the nodes below to read what was discussed on the walk.
            </h4>
            <SimpleMap markers={this.state.markers} />
          </section>
          <section className="walk-stats">
            <h4 className="graph-instructions story-sub-subheading">
              Mouseover the stats below to see averages for Toronto.
            </h4>
            <p className="stats-data">- 15 people attended this walk. <span>[31 average people per walk.]</span></p>
            <p className="placeholder">Placeholder</p>
            <p className="stats-data">- 10 people were New Canadians. [14 average New Canadians per walk.]</p>
            <p className="stats-data">
            <p className="placeholder">Placeholder</p>
              - 66% of people were from the neighbourhood the walk took place in.<br />
              [50% average people attending a walk are from that neighbourhood.]
            </p>
            <div className="pie-info-container">
              <div className="pie-container">
              <PieChart
                slices={[
                  {
                    color: '#8B008B',
                    value: 10,
                  },
                  {
                    color: '#FFA500',
                    value: 20,
                  },
                ]}
              />
              </div>
              <p className="stats-data pie-info">
                - 53% of people were on their first Jane's Walk.<br />
                [50% average people on a walk are new to Jane's Walk.]
              </p>
            </div>
            <div className="pie-info-container">
              <div className="pie-container">
              <PieChart
                slices={[
                  {
                    color: '#8B008B',
                    value: 10,
                  },
                  {
                    color: '#FFA500',
                    value: 20,
                  },
                ]}
              />
              </div>
              <p className="stats-data pie-info">
                - The group was mostly middle-aged, between 45 and 65 years old.<br />
                [Most people on Jane's Walks in Toronto are between 45 and 65 years old.]
              </p>
            </div>
            <p className="stats-data">
              - There were 50% more women than men.
              [There are 50% more women than men on average in Jane's Walks in Toronto.]
            </p>
            <h4 className="graph-trends story-sub-subheading">
              Other noticeable trends
            </h4>
            <p className="trend-info">
              <strong>Among the group:</strong> 1 public servant, 1 architect, 2 teachers, 2 students, 2 hikers, 1 photographer, 
              1 runner.
            </p>
            <p className="trend-info">
              <strong>While we were walking:</strong> 7 cyclists passed us, 10 cyclists were seen on the hydro corridor, 4 roller
              bladers went by. Cyclists - 7 passed us. 1 woman with walking sticks was power walking past us, 
              1 cyclist yelled at us to make room on the path. 66 people passed us total.</p>
          </section>
          <section className="walk-learnings">
            <h3 className="walk-section-heading">TOP 10 Learnings</h3>
            <ol>
              <li className="walk-learn-point">Local restaurant business have been booming, both small and big. <br />The signs of restaurants and 
              and shops were mainly in Persian, Korean, or Chinese (other than English).</li>
              <li className="walk-learn-point">Bigger chains of restaurants, coffee shops, etc. were located near subway stations. <br />Smaller 
              stores were located between major intersections, at lower profile buildings.</li>
              <li className="walk-learn-point">Many condominium buildings have been under construction or have already been constructed 
              within the past few years.</li>
              <li className="walk-learn-point">There is a great degree of condominium development planned for the future. <br />Ontario and Toronto's 
              official plan is urban intensification.</li>
              <li className="walk-learn-point">Urban intensification actually benefits both the city and the rural areas. Its aim is to stop 
              urban crawling.</li>
              <li className="walk-learn-point">Some spots, such as Churchill, were vacant without any official signs of future plans.</li>
              <li className="walk-learn-point">Behind Willowdale Park, an outdoor art theater is under construction but the design of the 
              theater was facing away from the road, resulting in an unwelcoming vibe.</li>
              <li className="walk-learn-point">The pathways behind condominiums along Doris were very pleasant with mature trees and a well-
              maintained landscape.</li>
              <li className="walk-learn-point">Many residents like to walk their dogs along Doris.</li>
              <li className="walk-learn-point">Many residents like to walk their dogs along Doris.</li>
            </ol>
          </section>
          <section className="report-footer clearfix">
            <div className="story-authors">
              <h4 className="story-authurs story-sub-subheading">
                WRITTEN BY:
              </h4>
              <div className="story-author">
                <img className="story-author-img" src="/img/josh.jpg" />
                <p className="story-author-name">Josh</p>
              </div>
              <div className="story-author">
                <img className="story-author-img" src="/img/default.jpg" />
                <p className="story-author-name">Nico</p>
              </div>
            </div>
            <div className="special-thanks">
              <h4 className="special-thanks-heading story-sub-subheading">
                SPECIAL THANKS TO:
              </h4>
              <div className="walk-sponsor-logo">
                <img src='/img/placeholder.png'/>
              </div>
              <div className="walk-sponsor-logo">
                <img src='/img/placeholder2.png'/>
              </div>
              <div className="walk-sponsor-logo">
                <img src='/img/placeholder3.jpg'/>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}