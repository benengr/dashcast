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

  handleRemoveUrl(event, index) {
    this.setState({
      boardList: this.state.boardList.filter((url, idx) => {
        return idx !== index;
      })
    });
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
        <form>
          { this.render_urls(this.state.boardList) }
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
