import React, { Component } from 'react';
import SimpleSlider from './simple_slider.js';
import SimpleMap from './simple_map.js'
import { Pie as PieChart } from 'react-chartjs';
var Chart = require('chartjs');
import { exampleData } from './data';
import { Button } from 'antd';
require('antd/dist/antd.css');

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default class ImpactReport extends Component {
  constructor (props) {
    super(props);

    this.state = {
      walks: exampleData,
      currentWalk: exampleData[0],
      activeImage: exampleData[0].images[0],
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
      pieData: [
              {
                  value: 300,
                  color:"#F7464A",
                  highlight: "#FF5A5E",
              },
              {
                  value: 50,
                  color: "#46BFBD",
                  highlight: "#5AD3D1",
              },
              {
                  value: 100,
                  color: "#FDB45C",
                  highlight: "#FFC870",              
              },
              {
                  value: 40,
                  color: "#949FB1",
                  highlight: "#A8B3C5",
              },
              {
                  value: 120,
                  color: "#4D5360",
                  highlight: "#616774",
              }
          ]
    }
    this._onImageSelect = this._onImageSelect.bind(this);
  }

  _onImageSelect(newImage) {
    this.setState({ activeImage: newImage });
  }

  render () {
    const {
      walks,
      currentWalk
    } = this.state;

    // convert demographics data for pieChart
    let dataFirstJaneswalk = [];
    dataFirstJaneswalk.push({value: currentWalk.stats.first_janeswalk.walk, color: '#800060'});
    dataFirstJaneswalk.push({value: currentWalk.attendees - currentWalk.stats.first_janeswalk.walk, color: '#f49f29'});
    const dataFirstJaneswalkPct = Math.round(parseFloat(currentWalk.stats.first_janeswalk.walk * 100) / currentWalk.attendees);
    const dataFirstJaneswalkPctAvg = currentWalk.stats.first_janeswalk.avg;

    let dataFromNeighbourhood = [];
    dataFromNeighbourhood.push({value: currentWalk.stats.from_neighbourhood.walk, color: '#800060'});
    dataFromNeighbourhood.push({value: currentWalk.attendees - currentWalk.stats.from_neighbourhood.walk, color: '#f49f29'});
    const dataFromNeighbourhoodPct = Math.round(parseFloat(currentWalk.stats.from_neighbourhood.walk * 100) / currentWalk.attendees);
    const dataFromNeighbourhoodPctAvg = currentWalk.stats.from_neighbourhood.avg;

    return (
      <div className='container my-app'>
        <ul>
          {walks.map((walk) => {
            return (
              <li key={walk.name} onClick={() => {this.setState({currentWalk: walk})}}>
                {walk.name}
              </li>
            );
          })}
        </ul>
        <section className='report-head'>
          <h3 className='report-heading'>Walk Story | Impact Report</h3>
          <a className='audio-toggle'>
            <i className='fa fa-volume-up' aria-hidden='true'></i>Audio ON/OFF
          </a>
          <Button type='ghost print-btn' size='large'>Print Report</Button>
        </section>
        <main className='report-walk-story'>
          <section className='walk-story'>
            <h1 className='story-title'>{currentWalk.name}</h1>
            <p className='walk-creators'>
              A Jane's Walk by: {currentWalk.leader}
              <span className='hint-text'> 
                [<a className='walk-link' href='#'>What's a Jane's Walk?</a>]
              </span>
            </p>
            <p className='walk-journalists'>
              Impact Report written by Walk Journalists: {currentWalk.journalists.join(', ')} 
              <span className='hint-text'> 
                [<a className='walk-link' href='#'>What's a Walk Journalist?</a>]
              </span>
            </p>
            <p className='walk-story-info'>
              Cummer Community Centre | Language(s): {currentWalk.languages.join(', ')} | {currentWalk.date}
            </p>
            <div className='walk-photo'>
              <img src={`/img/${this.state.activeImage.image}`}/>
            </div>
            <p className='walk-photo-desc'>
              {this.state.activeImage.caption}
            </p>
            <div className='carousel_container'>
              <SimpleSlider images={currentWalk.images} onImageSelect={this._onImageSelect} />
            </div>
          </section>
          <section className='walk-details'>
            <h3 className='walk-section-heading'>What This Walk Was About</h3>
            <p>{currentWalk.description}</p>
            <p>
              <span className='hint-text'>
                [See another walk in this series: <a className='walk-link' href='#'>{currentWalk.other_walks}</a>]
              </span>
            </p>
            <h4 className='map-instructions story-sub-subheading'>
              Mouseover the nodes below to read what was discussed on the walk.
            </h4>
            <SimpleMap markers={this.state.markers} />
          </section>
          <section className='walk-stats'>
            <h4 className='graph-instructions story-sub-subheading'>
              Mouseover the stats below to see averages for Toronto.
            </h4>
            {/*currentWalk.stats.map((stat) => {
              return (
                <p className='stats-data' key={stat}>- {stat}</p>
              );
            })*/}
            <p className='stats-data' title={`${currentWalk.stats.attendees.avg} average people per walk.`}>- {currentWalk.stats.attendees.walk} people attended this walk.</p>
            <p className='stats-data-demographics'>
              <span className='stats-data-demographics-walk'>{'i'.repeat(currentWalk.stats.attendees.walk)}</span>
              {'i'.repeat(currentWalk.stats.attendees.avg - currentWalk.stats.attendees.walk)}
            </p>

            <p className='stats-data' title={`${currentWalk.stats.new_canadians.avg} average New Canadians per walk.`}>- {currentWalk.stats.new_canadians.walk} people were New Canadians.</p>
            <p className='stats-data-demographics'>
              <span className='stats-data-demographics-walk'>{'i'.repeat(currentWalk.stats.new_canadians.walk)}</span>
              {'i'.repeat(currentWalk.stats.new_canadians.avg - currentWalk.stats.new_canadians.walk)}
            </p>
            
            { currentWalk.stats && currentWalk.stats.from_neighbourhood ?
              <div className='pie-info-container'>
                <div className='pie-container'>
                  <PieChart data={dataFromNeighbourhood} options={{responsive:true}} height='60' width='60' />
                </div>
                <p className='stats-data pie-info' title={`${dataFromNeighbourhoodPctAvg}% average people attending a walk are from that neighbourhood`}>
                  - {`${dataFromNeighbourhoodPct}% of people were from the neighbourhood the walk took place in.`}<br />
                </p>
              </div>
              : null
            }
            { currentWalk.stats && currentWalk.stats.first_janeswalk ?
              <div className='pie-info-container'>
                <div className='pie-container'>
                  <PieChart data={dataFirstJaneswalk} options={{responsive:true}} height='60' width='60' />
                </div>
                <p className='stats-data pie-info' title={`${dataFirstJaneswalkPctAvg}% average people on a walk are new to Jane's Walk.`}>
                  - {`${dataFirstJaneswalkPct}% of people were on their first Jane's Walk.`}<br />
                </p>
              </div>
              : null
            }
            <div className='pie-info-container'>
              <div className='pie-container'>
                <PieChart data={this.state.pieData} options={{responsive:true}} height='60' width='60' />
              </div>
              <p className='stats-data pie-info'>
                - The group was mostly middle-aged, between 45 and 65 years old.<br />
                [Most people on Jane's Walks in Toronto are between 45 and 65 years old.]
              </p>
            </div>
            <p className='stats-data'>
              - There were 50% more women than men.
              [There are 50% more women than men on average in Jane's Walks in Toronto.]
            </p>
            <h4 className='graph-trends story-sub-subheading'>
              Other noticeable trends
            </h4>
            <p className='trend-info'>
              <strong>Among the group:</strong> 1 public servant, 1 architect, 2 teachers, 2 students, 2 hikers, 1 photographer, 
              1 runner.
            </p>
            <p className='trend-info'>
              <strong>While we were walking:</strong> {currentWalk.while_we_were_walking}</p>
          </section>
          <section className='walk-learnings'>
            <h3 className='walk-section-heading'>TOP 10 Learnings</h3>
            <ol>
              {currentWalk.learnings.map((learning) => {
                return (
                  <li className='walk-learn-point' key={learning}>{learning}</li>
                );
              })}
            </ol>
          </section>
          <section className='report-footer clearfix'>
            <div className='story-authors'>
              <h4 className='story-authurs story-sub-subheading'>
                WRITTEN BY:
              </h4>
              {currentWalk.journalists.map((journalist) => {
                return (
                  <div className='story-author' key={journalist}>
                    <img className='story-author-img' src='/img/default.jpg' />
                    <p className='story-author-name'>{journalist}</p>
                  </div>
                );
              })}
            </div>
            <div className='special-thanks'>
              <h4 className='special-thanks-heading story-sub-subheading'>
                SPECIAL THANKS TO:
              </h4>
              <div className='walk-sponsor-logo'>
                <img src='/img/placeholder.png'/>
              </div>
              <div className='walk-sponsor-logo'>
                <img src='/img/placeholder2.png'/>
              </div>
              <div className='walk-sponsor-logo'>
                <img src='/img/placeholder3.jpg'/>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}