import React, { Component } from 'react';
import { fabric } from 'fabric';
import './setFilters.css';

export default class SetFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderVal: 50,
      curridx: 0,
      currfilter: ''
    }
  }

  getCanvas = () => {
    return this.props.canvas;
  };

  getImage = () => {
    if(this.props.canvas.getObjects("image")[0] == null){
      return null;
    } else{
      return this.props.canvas.getObjects("image")[0];
    }
  };

  refreshCanvas = (image, canvas) => {
    image.applyFilters();
    canvas.renderAll();
  };
  
  updateFilter = (idx, filter) => {
    let image = this.getImage();
    let canvas = this.getCanvas();

    if(image === null || this.state.currfilter === ''){
      return;
    }

    image.filters[idx][filter] = this.state.sliderVal / 100;
    this.refreshCanvas(image, canvas);
  };

  addFilter = (e) => {
    let image = this.getImage();
    let canvas = this.getCanvas();
    let f = fabric.Image.filters;
    let btnclicked = e.target.innerHTML.toLowerCase();
    let filter;

    if(image == null){
      return;
    }

    switch(btnclicked){
      case "vintage":
        filter = new f.Vintage({
          vintage: 0.5
        });
        break;
      case "sepia":
        filter = new f.Sepia({
          sepia: 0.1
        });

        break; 
      default:
        filter = new f.Blur({
          blur: 0.5
        });
    }

    if(image.filters.length === 0){
      this.setState({curridx : 0});
    } else {
      let curr = this.state.curridx;
      this.setState({curridx : curr += 1});
    }

    image.filters.push(filter);
    this.setState({ currfilter: btnclicked});
    this.refreshCanvas(image, canvas);
  };

  removeFilter = () => {
    let canvas = this.getCanvas();
    let image = this.getImage();

    if(image === null || this.state.currfilter === ''){
      return;
    }

    image.filters.pop(this.state.curridx);

    if(image.filters.length === 0){
      this.setState({curridx : 0});
      this.setState({ currfilter: ''});
    } else {
      let curr = this.state.curridx;
      this.setState({curridx : curr - 1});
    }

    this.refreshCanvas(image, canvas);
  }

  switchBtn = (e) =>{
    let btn = e.target;
    btn.classList.toggle('active');
  };

  changeSlideVal = (e) =>{
    let slider = e.target;
    slider.previousSibling.innerHTML = e.target.value;
    this.setState({ sliderVal: e.target.value});
    this.updateFilter(this.state.curridx, this.state.currfilter);
  };

  toggleMenu = (e) => {
    let parent = e.target.parentElement;
    let slider = document.getElementById("slider");
    slider.classList.toggle('sliderConFull');
    parent.classList.toggle('slide');
  };

  render() {
    return (
      <div className="setfilters">
        <h1>Filter Options</h1>
        <button 
        className="btn optionsBtn"
        onClick={this.toggleMenu}
        >
          X
        </button>
        <div className="btnDiv">
          <button 
          className="btn filterBtn"
          onClick={this.addFilter}
          >
            Vintage
          </button>
          <button 
            className="btn filterBtn"
            onClick={this.addFilter}
          >
            Sepia
          </button>
          <button 
          className="btn filterBtn"
          onClick={this.addFilter}
          >
            Blur
          </button>
          <button 
          className="btn filterBtn deleteFilBtn"
          onClick={this.removeFilter}
          >
            Delete
          </button>
        </div>
        <div className="sliderCon" id="slider">
          <h2>50</h2>
          <input 
            type="range" 
            min="0" 
            max="100" 
            className="slider"
            value={this.state.sliderVal} 
            onChange={this.changeSlideVal}
            step="1" />
        </div>
      </div>
    );
  }
}