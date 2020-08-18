import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Upload from './components/upload/upload';
import Preview from './components/preview/preview';

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  };

  imageCallback = (data) => {
    this.setState({image: data});
  };

  render() {
    return (
      <div className="container-main">
          <Header />
          <div className="container-main">
            <Preview image={this.state.image}/>
            <Upload callbackFromParent={this.imageCallback}/>
          </div>
      </div>
    );
  }
}
