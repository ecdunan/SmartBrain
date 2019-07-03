import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js'
import './App.css';
import 'tachyons';

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

function App() {
  return (
    <div className="App">
      <Particles className='particles'
              params={particlesParams}
            />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
            {/*  <FaceRecognition />*/}
      <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    </div>
  );
}

export default App;
