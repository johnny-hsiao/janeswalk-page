import React, { Component } from 'react';
import SimpleSlider from './simple_slider.js';
import SimpleMap from './simple_map.js'
import PieChart from 'react-simple-pie-chart';
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
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
      pieData: 
        [
          {
            color: '#8B008B',
            value: 10,
          },
          {
            color: '#FFA500',
            value: 20,
          },
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

    return (
      <div className="container my-app">
        <Button type="primary">Primary</Button>
        <ul>
          {walks.map((walk) => {
            return (
              <li key={walk.name} onClick={() => {this.setState({currentWalk: walk})}}>
                {walk.name}
              </li>
            );
          })}
        </ul>
        <section className="report-head">
          <h3 className="report-heading">Walk Story | Impact Report</h3>
          <a className="audio-toggle">
            <i className="fa fa-volume-up" aria-hidden="true"></i>Audio ON/OFF
          </a>
          <a className="print-btn">Print Report</a>
        </section>
        <main className="report-walk-story">
          <section className="walk-story">
            <h1 className="story-title">{currentWalk.name}</h1>
            <p className="walk-creators">
              A Jane's Walk by: {currentWalk.leader}
              <span className="hint-text"> 
                [<a className="walk-link" href="#">What's a Jane's Walk?</a>]
              </span>
            </p>
            <p className="walk-journalists">
              Impact Report written by Walk Journalists: {currentWalk.journalists.join(', ')} 
              <span className="hint-text"> 
                [<a className="walk-link" href="#">What's a Walk Journalist?</a>]
              </span>
            </p>
            <p className="walk-story-info">
              Cummer Community Centre | Language(s): {currentWalk.languages.join(', ')} | {currentWalk.date}
            </p>
            <div className="walk-photo">
              <img src={`/img/${this.state.activeImage.image}`}/>
            </div>
            <p className="walk-photo-desc">
              {this.state.activeImage.caption}
            </p>
            <div className="carousel_container">
              <SimpleSlider images={currentWalk.images} onImageSelect={this._onImageSelect} />
            </div>
          </section>
          <section className="walk-details">
            <h3 className="walk-section-heading">What This Walk Was About</h3>
            <p>{currentWalk.description}</p>
            <p>
              <span className="hint-text">
                [See another walk in this series: <a className="walk-link" href="#">{currentWalk.other_walks}</a>]
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
            {currentWalk.stats.map((stat) => {
              return (
                <p className="stats-data" key={stat}>- {stat}</p>
              );
            })}
            <div className="pie-info-container">
              <div className="pie-container">
              <PieChart slices={this.state.pieData} />
              </div>
              <p className="stats-data pie-info">
                - 53% of people were on their first Jane's Walk.<br />
                [50% average people on a walk are new to Jane's Walk.]
              </p>
            </div>
            <div className="pie-info-container">
              <div className="pie-container">
              <PieChart slices={this.state.pieData} />
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
              <strong>While we were walking:</strong> {currentWalk.while_we_were_walking}</p>
          </section>
          <section className="walk-learnings">
            <h3 className="walk-section-heading">TOP 10 Learnings</h3>
            <ol>
              {currentWalk.learnings.map((learning) => {
                return (
                  <li className="walk-learn-point" key={learning}>{learning}</li>
                );
              })}
            </ol>
          </section>
          <section className="report-footer clearfix">
            <div className="story-authors">
              <h4 className="story-authurs story-sub-subheading">
                WRITTEN BY:
              </h4>
              {currentWalk.journalists.map((journalist) => {
                return (
                  <div className="story-author" key={journalist}>
                    <img className="story-author-img" src="/img/default.jpg" />
                    <p className="story-author-name">{journalist}</p>
                  </div>
                );
              })}
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