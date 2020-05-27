import React, { Component } from 'react';
import Pictures from '../components/Pictures/Pictures';
import './App.css';


class App extends Component {
  
  state = {
    URLs: [ 
      "https://s3.amazonaws.com/pastperfectonline/images/museum_975/004/20020601.jpg",
      "https://s3.amazonaws.com/pastperfectonline/images/museum_975/004/20020602.jpg",
      "https://s3.amazonaws.com/pastperfectonline/images/museum_975/004/20020608.jpg",
      "https://s3.amazonaws.com/pastperfectonline/images/museum_975/003/20022612.jpg",
      "https://s3.amazonaws.com/pastperfectonline/images/museum_975/003/20022620.jpg"
      ]
  }

  getRandomImage = () => {

  }
  
  
  render() {
    return (
      <Pictures 
        URLs={this.state.URLs}
      />
    );
  }
  
}

export default App;
