import React from 'react';
import $ from 'jquery';
import ImpactReport from './impact_report.js';
 
describe('ImpactReport', () => {

  it('should render to the DOM', function() {

    //  Create the <Home /> react component.
    var component = React.render(<ImpactReport />, document.body);

    //  Find the DOM element for the created component.
    var node = React.findDOMNode(component);

    //  Check the DOM looks how we'd expect it to.
    expect($(node).children('h1').text()).toEqual("React ES6 Starter");
    
  });

});