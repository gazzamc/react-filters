import React, { Component } from 'react';
import './setFilters.css';

export default class SetFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderVal: 0
    }
  }

  switchBtn = (e) =>{
    let btn = e.target;
    btn.classList.toggle('active');
  };

  changeSlideVal = (e) =>{
    let slider = e.target;
    let h2 = slider.previousSibling;
    h2.innerHTML = e.target.value;
    this.setState({ sliderVal: e.target.value});
  };

  toggleMenu = (e) => {
    let parent = e.target.parentElement;
    let slider = document.getElementById("slider");
    slider.classList.toggle('sliderConFull');
    parent.classList.toggle('slide');
  }

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
          onClick={this.switchBtn}
          >
            Vintage
          </button>
          <button 
            className="btn filterBtn"
            onClick={this.switchBtn}
          >
            Sepia
          </button>
          <button 
          className="btn filterBtn"
          onClick={this.switchBtn}
          >
            Blur
          </button>
        </div>
        <div className="sliderCon" id="slider">
          <h2>0</h2>
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