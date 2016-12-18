import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";

export default class SimpleMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props.containerElementProps}
              style={{
                height: '400px',
                width: '100%',
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => {
                window.map = map; 
                var flightPath = new google.maps.Polyline({
                  path: this.props.path,
                  geodesic: true,
                  strokeColor: '#F49F29',
                  strokeOpacity: 1.0,
                  strokeWeight: 2
                })

                flightPath.setMap(window.map.props.map);
              }}
              defaultZoom={17}
              defaultCenter={this.props.markers[0].position}
              onClick={this.props.onMapClick}
            >
              {this.props.markers.map((marker, index) => {
                return (
                  <Marker
                    {...marker}
                    onRightclick={() => this.props.onMarkerRightclick(index)}>
                    <InfoWindow style={{backgroundColor: '#f49f29'}}>
                      {`${marker.key}`}
                    </InfoWindow>
                  </Marker>
                );
              })}
            </GoogleMap>
          }
        />
      </section>
    );
  }
}