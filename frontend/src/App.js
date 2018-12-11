import React, { Component } from 'react';
import './App.css';
import ReactLoading from 'react-loading';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    console.info("Starting");
    super(props);
    this.state = null;
    this.read_config()
  }

  read_config() {
    console.debug("Reading config");
    axios.get('/dash_manager/v1/boards').then(res => {
      console.debug("Config Read");
      this.setState({config: res.data});
    });
  }

  render_loading() {
    console.info("redering loading");
    return (
      <div className="App-loading">
        <ReactLoading type="cylon" color="#888888" height="50%" width="50%"/>
      </div>
    )
  }

  render_ready() {
    return (
      <div className="App">
        ready
      </div>
    );
  }

  render() {
    return this.state === null ? this.render_loading() : this.render_ready();
    
  }
}

export default App;
