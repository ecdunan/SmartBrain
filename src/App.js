import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
 apiKey: 'ce2e19410fea4a48b8d521989ea8963b'
});

const particlesParams = {
  particles: {
    number: {
      value: Math.random() * (+50 - +30) + +30,
      density : {
        enable: true,
        value_area: Math.random() * (+400 - +200) + +200
      }
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl : '',
      boxes: []
    }
  }

  calcFaceLoc = (response) => {
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

  setBoxesState = (boxes) => {
    this.setState({boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onEnter = (event) => {
    if (event.key === 'Enter') {
      this.onInputChange(event);
      this.onDetect();
    }
  }

  onDetect = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.setBoxesState(this.calcFaceLoc(response)))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
                params={particlesParams}
              />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange}
                       onDetect={this.onDetect}
                       onEnter={this.onEnter}/>
        <FaceRecognition boxes={this.state.boxes}
                         image={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
