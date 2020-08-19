import React, { Component } from 'react';
import './App.css';
import Upload from './components/upload/upload';
import Preview from './components/preview/preview';
import SetFilters from './components/filters/setFilters';

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      canvas: {}
    };
  };

  imageCallback = (data) => {
    this.setState({image: data});
  };

  canvasCallback = (data) => {
    this.setState({canvas: data});
  };

  render() {
    return (
      <div>
          <div className="container-main">
            <SetFilters canvas={this.state.canvas}/>
            <Preview image={this.state.image} callbackFromParent={this.canvasCallback}/>
            <Upload callbackFromParent={this.imageCallback}/>
          </div>
      </div>
    );
  }
}
