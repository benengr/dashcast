import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ReactLoading color="#888888" height="25%" width="25%" />
      </div>
    );
  }
}

export default App;
