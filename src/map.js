'use strict';

var ReactDOM = require('react-dom');
var polyline = require('polyline');
import React from 'react';

var Map = React.createClass({

	componentDidMount(){

		// Only componentDidMount is called when the component is first added to
		// the page. This is why we are calling the following method manually.
		// This makes sure that our map initialization code is run the first time.

		this.componentDidUpdate();
	},

	componentDidUpdate(){

		if(this.lastLat == this.props.lat && this.lastLng == this.props.lon){

			// The map has already been initialized at this address.
			// Return from this method so that we don't reinitialize it
			// (and cause it to flicker).

			return;
		}

		this.lastLat = 0;
		this.lastLng = 0;

		var map = new GMaps({
			el: '#map',
			lat: this.props.lat,
			lng: this.props.lon,
			zoom: 13
		});

		// Adding a marker to the location we are showing

		map.addMarker({
			lat: this.props.lat,
			lng: this.props.lon
		});

    map.drawPolyline({
      path: polyline.decode(this.props.polyline),
      strokeColor: '#131540',
      strokeOpacity: 0.6,
      strokeWeight: 6
    });
	},



	render(){
		console.log(this.props.lat);
		return (
			<div className="map-holder">
				<p>Loading...</p>
				<div id="map"></div>
			</div>
		);
	}

});

module.exports = Map;
