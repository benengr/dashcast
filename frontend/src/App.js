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
      console.log(`Setting state to ${JSON.stringify(res.data)}`);
      this.setState({config: res.data});
    });
  }

  render_urls(urls) {
    return urls.map((url, index) => {
      return (<input type="text" defaultValue={url} key={index}/>);
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
    console.info(`config is: ${JSON.stringify(this.state.config)}`);
    return (
      <div className="App">
          { this.render_urls(this.state.config.boardList) }
          Delay:
          <input type="number" defaultValue={this.state.config.delay} />
      </div>
    );
  }

  render() {
    if(this.state === null) {
      console.log("Waiting for state")
      return this.render_loading();
    } else {
      console.log("Have config");
      return this.render_config();
    }
    
  }
}

export default App;
