import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = null;
    this.get_config();
  }

  get_config() {
    axios.get('/dash_manager/v1/boards').then(res => {
      console.log(res);
      this.setState({config: res.data});
    });
  }

  render_loading() {
    return (
      <div className="App">
        <ReactLoading color="#888888" height="25%" width="25%" />
      </div>
    );
  }

  render_config() {
    return (
      <div className="App">
          {this.state.config.toString()}
      </div>
    );
  }

  render() {
    if(this.state === null) {
      console.log("Waiting for staet")
      return this.render_loading();
    } else {
      console.log("Have config");
      return this.render_config();
    }
    
  }
}

export default App;
