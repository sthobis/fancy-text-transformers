import React, { Component } from 'react';
import FancyTextTransformers from './FancyTextTransformers'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Demo</h1>
        <p>Hover link below</p>
        <a href='https://github.com/sthobis'>
          <FancyTextTransformers
            text='github.com/sthobis'
            mask='github'
          />
        </a>
      </div>
    );
  }
}

export default App;
