import React from 'react';

export default class ImpactReport extends React.Component {
  render () {
    return (
      <div className="container my_app">
        <section className="report-head">
          <h2 className="report-heading">Walk Story | Impact Report</h2>
          <p className="audio-toggle">Audio ON/OFF</p>
          <p className="print">Print Report</p>
        </section>
        <section className="walk-story">
          <h1 className="story-title">Where to Watch Salmon on the Don</h1>
          <p className="walk-creators">
            A Jane's Walk by: Sook Chang & Denise Pinto 
            <span className="hint-text">
              [<a href="#">What's a Jane's Walk?</a>]
            </span>
          </p>
          <p className="walk-journalists">
            A Jane's Walk by: Sook Chang & Denise Pinto 
            <span className="hint-text">
              [<a href="#">What's a Walk Journalist?</a>]
            </span>
          </p>
          <p className="walk-story-info">
            Cummer Community Centre | Language(s): English, Korean | March 19, 2016, 2:00 PM, 2 hours
          </p>
          <div className="walk-photo">
            <img src="/images/humber1.jpg"/>
          </div>
          <p className="walk-photo-desc">
            Above: Walk leader, Sook Chang, shows residents a prime salmon spotting area. "This is 
            the first spot I brought my friends from South Korea. Not to Niagara Falls or other tourist
            places. This is something they would never see back home."
          </p>
          <p className="placeholder">Carousel for photo here</p>
        </section>
        <section className="walk-details">
          <h2 className="walk-section-heading">What This Walk Was About</h2>
          <p>
            This walk took old and new neighbours alike into a ravine to explore stories of the ravine
            system from the eyes of a new immigrant, including where salmon can be spotted in the fall.
            <br />
            <span className="hint-text">
              [See another walk in this series: <a href="#">Humber Trail Walk</a>]
            </span>
          </p>
          <h3 className="map-instructions">
            Mouseover the nodes below to read what was discussed on the walk.
          </h3>
          <p className="placeholder">Google Map</p>
        </section>
        <section className="walk-stats">
          <h3 className="graph-instructions">
            Mouseover the stats below to see averages for Toronto.
          </h3>
          <p className="placeholder">Graph data stuff</p>
          <h3 className="graph-trends">
            Other noticeable trends
          </h3>
          <p className="trend-info">
            Among the group: 1 public servant, 1 architect, 2 teachers, 2 students, 2 hikers, 1 photographer, 
            1 runner.
          </p>
          <p className="trend-info">
            While we were walking: 7 cyclists passed us, 10 cyclists were seen on the hydro corridor, 4 roller
            bladers went by. Cyclists - 7 passed us. 1 woman with walking sticks was power walking past us, 
            1 cyclist yelled at us to make room on the path. 66 people passed us total.</p>
        </section>
        <section className="walk-learnings">
          <h2 className="walk-section-heading">TOP 10 Learnings</h2>
          <ol>
            <li className="walk-learn-point">Local restaurant business have been booming, both small and big. The signs of restaurants and 
            and shops were mainly in Persian, Korean, or Chinese (other than English).</li>
            <li className="walk-learn-point">Bigger chains of restaurants, coffee shops, etc. were located near subway stations. Smaller 
            stores were located between major intersections, at lower profile buildings.</li>
            <li className="walk-learn-point">Many condominium buildings have been under construction or have already been constructed 
            within the past few years.</li>
            <li className="walk-learn-point">There is a great degree of condominium development planned for the future. Ontario and Toronto's 
            official plan is urban intensification.</li>
            <li className="walk-learn-point">Urban intensification actually benefits both the city and the rural areas. Its aim is to stop 
            urban crawling.</li>
            <li className="walk-learn-point">Some spots, such as Churchill, were vacant without any official signs of future plans.</li>
            <li className="walk-learn-point">Behind Willowdale Park, an outdoor art theater is under construction but the design of the 
            theater was facing away from the road, resulting in an unwelcoming vibe.</li>
            <li className="walk-learn-point">The pathways behind condominiums along Doris were very pleasant with mature trees and a well-
            maintained landscape.</li>
            <li className="walk-learn-point">Many residents like to walk their dogs along Doris.</li>
          </ol>
        </section>
        <section className="report-footer">
          <div className="report-authors">
            <p className="placeholder">Josh and Nico</p>
          </div>
          <div className="special-thanks">
            <p className="placeholder">sponsors</p>
          </div>
        </section>
      </div>
    );
  }
}