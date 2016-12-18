import React, { Component } from 'react';
import SimpleSlider from './simple_slider.js';
import SimpleMap from './simple_map.js'
import { Pie as PieChart } from 'react-chartjs';
var Chart = require('chartjs');
import { exampleData } from './data';
import { Button } from 'antd';
require('antd/dist/antd.css');

export default class ImpactReport extends Component {
  constructor (props) {
    super(props);

    this.state = {
      walks: exampleData,
      currentWalk: exampleData[0],
      activeImage: exampleData[0].images[0],
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

    // convert data for first janeswalk's attendees for pieChart
    let dataFirstJaneswalk = [];
    dataFirstJaneswalk.push({value: currentWalk.stats.first_janeswalk.walk, color: '#6F0564'});
    dataFirstJaneswalk.push({value: currentWalk.attendees - currentWalk.stats.first_janeswalk.walk, color: '#f49f29'});
    const dataFirstJaneswalkPct = Math.round(parseFloat(currentWalk.stats.first_janeswalk.walk * 100) / currentWalk.attendees);
    const dataFirstJaneswalkPctAvg = currentWalk.stats.first_janeswalk.avg;

    // convert data for attendees from neighbourhood for pieChart
    let dataFromNeighbourhood = [];
    dataFromNeighbourhood.push({value: currentWalk.stats.from_neighbourhood.walk, color: '#6F0564'});
    dataFromNeighbourhood.push({value: currentWalk.attendees - currentWalk.stats.from_neighbourhood.walk, color: '#f49f29'});
    const dataFromNeighbourhoodPct = Math.round(parseFloat(currentWalk.stats.from_neighbourhood.walk * 100) / currentWalk.attendees);
    const dataFromNeighbourhoodPctAvg = currentWalk.stats.from_neighbourhood.avg;

    const dataWomenPct = Math.round(parseFloat(currentWalk.stats.women.walk * 100) / currentWalk.attendees);
    const dataWomenPctAvg = currentWalk.stats.women.avg;

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
              {`Above: ${this.state.activeImage.caption}`}
            </p>
            <div className='carousel-container'>
              <SimpleSlider images={currentWalk.images} onImageSelect={this._onImageSelect} />
            </div>
          </section>
          <section className='walk-details'>
            <h3 className='walk-section-heading'>What This Walk Was About</h3>
            <p className='walk-description'>{currentWalk.description}</p>
            <p className='walk-in-this-series'>
              <span className='hint-text'>
                [See another walk in this series: <a className='walk-link' href='#'>{currentWalk.other_walks}</a>]
              </span>
            </p>
            <h4 className='map-instructions'>
              Mouseover the nodes below to read what was discussed on the walk.
            </h4>            
            <SimpleMap markers={currentWalk.map_data} path={currentWalk.path} redraw />
            <ul style={{border: '1px solid black', padding: '5px', borderRadius: '10px', marginTop: '10px'}}>
              <li>Placeholder</li>
              {currentWalk.map_data.map(({ key, leader, participant, journalist }) => {
                return (
                  <li key={key}>
                    <ol>
                      <li>Spot: {key}</li>
                      <li>Leader: {leader.join(', ')}</li>
                      <li>Participant: {participant.join(', ')}</li>
                      <li>Journalist: {journalist.join(', ')}</li>
                    </ol>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className='walk-stats'>
            <h3 className='walk-section-heading'>Quick Stats</h3>
            <h4 className='graph-instructions'>
              Mouseover the stats below to see averages for Toronto.
            </h4>
            <div className="stats-data-container">
              <p title={`${currentWalk.stats.attendees.avg} average people per walk.`}>- {currentWalk.stats.attendees.walk} people attended this walk.</p>
              <p className='stats-data-demographics'>
                <span className='stats-data-demographics-walk'>{'i'.repeat(currentWalk.stats.attendees.walk)}</span>
                {'i'.repeat(currentWalk.stats.attendees.avg - currentWalk.stats.attendees.walk)}
              </p>
            </div>
            <div className="stats-data-container">
              <p title={`${currentWalk.stats.new_canadians.avg} average New Canadians per walk.`}>- {currentWalk.stats.new_canadians.walk} people were New Canadians.</p>
              <p className='stats-data-demographics'>
                <span className='stats-data-demographics-walk'>{'i'.repeat(currentWalk.stats.new_canadians.walk)}</span>
                {'i'.repeat(currentWalk.stats.new_canadians.avg - currentWalk.stats.new_canadians.walk)}
              </p>
            </div>
            { currentWalk.stats && currentWalk.stats.from_neighbourhood ?
              <div className='pie-info-container'>
                <div className='pie-container'>
                  <PieChart data={dataFromNeighbourhood} options={{responsive:true}} height='60' width='60' />
                </div>
                <p className='pie-info' title={`${dataFromNeighbourhoodPctAvg}% average people attending a walk are from that neighbourhood`}>
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
                <p className='pie-info' title={`${dataFirstJaneswalkPctAvg}% average people on a walk are new to Jane's Walk.`}>
                  - {`${dataFirstJaneswalkPct}% of people were on their first Jane's Walk.`}<br />
                </p>
              </div>
              : null
            }
            <p className='other-stats' title="Most people on Jane's Walks in Toronto are between 45 and 65 years old.">
              - {`The group was mostly ${currentWalk.demographics_majority}.`}
            </p>
            <p className='other-stats' title={`There are ${dataWomenPctAvg}% more women than men on average in Jane's Walks in Toronto.`}>
              - {`There were ${dataWomenPct}% more women than men.`}
            </p>
            <h4 className='graph-trends'>
              Other noticeable trends
            </h4>
            <p className='trend-info'>
              <strong>Among the group:</strong> 1 public servant, 1 architect, 2 teachers, 2 students, 2 hikers, 1 photographer, 1 runner.
            </p>
            <p className='trend-info'>
              <strong>While we were walking:</strong> {(currentWalk.while_we_were_walking) ? currentWalk.while_we_were_walking : 'n/a'}</p>
          </section>
          <section className='walk-learnings'>
            <h3 className='walk-section-heading'>TOP 10 Learnings</h3>
            <ol>
              {currentWalk.learnings.map((learning) => {
                return <li className='walk-learn-point' key={learning}>{learning}</li>;
              })}
            </ol>
          </section>
          <section className='report-footer clearfix'>
            <div className='story-authors'>
              <h4 className='story-authurs'>
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
              <h4 className='special-thanks-heading'>
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