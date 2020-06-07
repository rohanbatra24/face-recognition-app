import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles, { HoverMode } from 'react-particles-js';

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
			imageUrl : '',
			box      : {},
			route    : 'signin'
		};
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol   : clarifaiFace.left_col * width,
			topRow    : clarifaiFace.top_row * height,
			rightCol  : width - clarifaiFace.right_col * width,
			bottomRow : height - clarifaiFace.bottom_row * height
		};
	};

	displayFaceBox = (box) => {
		console.log('box', box);
		this.setState({ box: box });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = (event) => {
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) => {
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		this.setState({ route });
	};

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navigation onRouteChange={this.onRouteChange} />
				{this.state.route === 'signin' ? (
					<SignIn onRouteChange={this.onRouteChange} />
				) : (
					<div>
						<Logo />
						<Rank />
						<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
						<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
					</div>
				)}
			</div>
		);
	}
}

export default App;
