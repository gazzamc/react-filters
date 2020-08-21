import React, { Component } from 'react';
import './App.css';
import Upload from './components/upload/upload';
import Preview from './components/preview/preview';
import SetFilters from './components/filters/setFilters';
import Download from './components/download/download';

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
            <Preview image={this.state.image} callbackFromParent={this.canvasCallback}/>
            <Upload callbackFromParent={this.imageCallback}/>
            <SetFilters canvas={this.state.canvas}/>
            <Download canvas={this.state.canvas}/>
          </div>
      </div>
    );
  }
}
