import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import { particlesParams } from './config.js'
import './App.css';
import 'tachyons';

const initialState = {
  input: '',
  imageUrl : '',
  boxes: [],
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: 0,
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};
class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = user => {
    this.setState({user : {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }});
  }

  onChangeRoute = route => {
    this.setState({route});

    if (route === 'signOut') {
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
  }

    calculateFaceLocation = response => {
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
        fetch('http://localhost:3000/imageurl', {
          method: 'POST',
          headers: {'Content-type' : 'application/json'},
          body : JSON.stringify({
            id: this.state.user.id,
            input: this.state.input
          })
        })
        .then(response => response.json())
        .then(response =>
          {
            if(response) {
              fetch('http://localhost:3000/image', {
                method: 'PUT',
                headers: {'Content-type' : 'application/json'},
                body : JSON.stringify({
                  id: this.state.user.id
                })
              }).then(response => response.json())
                .then(count => {
                  this.setState(Object.assign(this.state.user, {entries: count}))
                })
              }
              this.setBoxesState(this.calculateFaceLocation(response))
        })
        .catch(error => console.log(error));
    }
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.onInputChange(event);
      this.onDetect();
    }
  }

  onInputChange = event => {
    this.setState({input: event.target.value});
  }

  setBoxesState = boxes => {
    this.setState({boxes});
  }

  render() {
      const { imageUrl, route, boxes, isSignedIn, user} = this.state;
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
                <Rank name = {user.name}
                      entries = {user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange}
                               onDetect={this.onDetect}
                               onEnter={this.onEnter}/>
                <FaceRecognition boxes={boxes}
                                 image={imageUrl}/>
              </div>
          ) : route === 'register'
              ? <Register onRegister={this.onChangeRoute}
                          loadUser={this.loadUser}/>
              :
                <SignIn onSignIn={this.onChangeRoute}
                        loadUser={this.loadUser}/>
        }
      </div>
    );
  }
}

export default App;
