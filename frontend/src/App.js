import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './App.css';
import axios from 'axios';

const CONFIG_ENDPOINT = '/dash_manager/v1/boards';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boardList: null,
      delay: null
    };
    this.get_config();
  }

  reset_state() {
    this.setState({
      boardList: null,
      delay: null
    });
  }

  set_config(config) {
    this.setState({
      boardList: config.boardList,
      delay: config.delay
    });
  }

  get_config() {
    axios.get(CONFIG_ENDPOINT).then(res => {
      console.log(`Setting state to ${JSON.stringify(res.data)}`);
      this.set_config(res.data);
    });
  }

  post_config(event) {
    console.log(`Current config is ${JSON.stringify(this.state)}`);
    const data = {
      boardList: this.state.boardList,
      delay: parseInt(this.state.delay)
    };
    console.log(`Data is ${JSON.stringify(data)}`);
    this.reset_state();
    axios.post(CONFIG_ENDPOINT, data).then(res => {
      this.set_config(res.data);
    });
    event.preventDefault();
  }

  handleUrlChange(event, index) {
    const newUrls = this.state.boardList.map((url, idx) => {
      if(idx !== index) return url;
      return(event.target.value);
    });

    this.setState({boardList: newUrls});
  }

  handleRemoveUrl(event, index) {
    this.setState({
      boardList: this.state.boardList.filter((url, idx) => {
        return idx !== index;
      })
    });
  }

  handleAddUrl(event) {
    const newUrls = this.state.boardList;
    newUrls.push('');
    this.setState({boardList: newUrls});
  }

  handleChangeDelay(event) {
    this.setState({delay: event.target.value});
  }

  render_urls(urls) {
    return urls.map((url, index ) => {
      return (
        <div className="form-group url-input" key={index} >
          <input className="form-control" type="text" value={url} onChange={(e) => {this.handleUrlChange(e, index)}} />
          <button type="button" onClick={(e) => this.handleRemoveUrl(e, index)} className='btn btn-secondary' />
        </div>
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
        <form className="configForm">
          <div className="inputs">
            <div className="urlInputs">
              { this.render_urls(this.state.boardList) }
            </div>
            <div className="otherConfig">
              <div className="form-group">
                <label>Delay</label>
                <input className="form-control" type="number" value={this.state.delay} onChange={(e) => this.handleChangeDelay(e)}/>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button className="btn btn-secondary" type="button" onClick={(e) => this.handleAddUrl(e)}>Add Board</button>
            <button className="btn btn-secondary" type="button" onClick={(e) => this.get_config()}>Reload</button>
            <button className="btn btn-primary" onClick={(e) => this.post_config(e)}>Submit</button>
          </div>
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
