import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey : 'f84bba4ed61d47ce8ff66f3e22bf02b5'
});

const particlesOptions = {
	particles : {
		line_linked : {
			shadow : {
				enable : true,
				color  : '#3CA9D1',
				blur   : 5
			}
		}
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input    : '',
			imageUrl : ''
		};
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
		console.log(event.target.value);
	};

	onButtonSubmit = (event) => {
		this.setState({ imageUrl: this.state.input });
		console.log('click');
		app.models.predict(Clarifai.COLOR_MODEL, this.state.input).then(
			function(response) {
				// do something with response
				console.log(response);
			},
			function(err) {
				// there was an error
			}
		);
	};

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
				<FaceRecognition imageUrl={this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
