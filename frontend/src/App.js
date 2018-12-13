import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boardList: null,
      delay: null
    };
    this.get_config();
  }

  get_config() {
    axios.get('/dash_manager/v1/boards').then(res => {
      console.log(`Setting state to ${JSON.stringify(res.data)}`);
      this.setState({
        boardList: res.data.boardList,
        delay: res.data.delay
      });
    });
  }

  handleUrlChange(event, index) {
    const newUrls = this.state.boardList.map((url, idx) => {
      if(idx !== index) return url;
      return(event.target.value);
    });

    this.setState({boardList: newUrls});
  }

  render_urls(urls) {
    return urls.map((url, index) => {
      return (
        <input className="form-control" key={index} type="text" value={url} onChange={(e) => {this.handleUrlChange(e, index)}} />
      );
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
    console.info(`state is: ${JSON.stringify(this.state)}`);
    return (
      <div className="App">
        <form>
          { this.render_urls(this.state.boardList) }
          
          <div className="form-group">
            <label htmlFor="delayInput">Delay</label>
            <input type="number" className="form-control" id="delayInput" defaultValue={this.state.delay} />

          </div>
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          <button type="button" className="btn btn-default">
            Add
          </button>
          <button type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
          </button>
        </form>
      </div>
    );
  }

  render() {
    if(this.state.boardList === null) {
      console.log("Waiting for state")
      return this.render_loading();
    } else {
      console.log("Have config");
      return this.render_config();
    }
    
  }
}

export default App;
