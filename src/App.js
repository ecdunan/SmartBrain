import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Clarifai from 'clarifai';
import { particlesParams } from './config.js'
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
 apiKey: 'ce2e19410fea4a48b8d521989ea8963b'
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl : '',
      boxes: [],
      route: 'signIn',
      isSignedIn: false
    }
  }

  onChangeRoute = (route) => {
    this.setState({route});

    if (route === 'signOut') {
      this.setState({isSignedIn: false});
    } else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
  }

    calculateFaceLocation = (response) => {
    const facesArray  = response.outputs[0].data.regions;
    const image       = document.getElementById('inputImage');
    const height      = Number(image.height);
    const width       = Number(image.width);
    const coordsArray = facesArray.map(face => {
      const box = face.region_info.bounding_box;
      return {
        leftCol : box.left_col * width,
        topRow : box.top_row * height,
        rightCol : width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      }
    });
    return coordsArray;
  }

  onDetect = () => {
    if (this.state.input) {
      this.setState({imageUrl: this.state.input});
      app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
        .then(response => this.setBoxesState(this.calculateFaceLocation(response)))
        .catch(error => console.log(error));
    }
  }

  onEnter = (event) => {
    if (event.key === 'Enter') {
      this.onInputChange(event);
      this.onDetect();
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  setBoxesState = (boxes) => {
    this.setState({boxes});
  }

  render() {
      const { imageUrl, route, boxes, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
                params={particlesParams}
              />
        <Navigation isSignedIn={isSignedIn}
                    onChangeRoute={this.onChangeRoute}/>

        {
          route === 'home'
          ? (
              <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange}
                               onDetect={this.onDetect}
                               onEnter={this.onEnter}/>
                <FaceRecognition boxes={boxes}
                                 image={imageUrl}/>
              </div>
          ) : route === 'register'
              ? <Register onRegister={this.onChangeRoute} />
              :
                  <SignIn onSignIn={this.onChangeRoute} />
        }
      </div>
    );
  }
}

export default App;
