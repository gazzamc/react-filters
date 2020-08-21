import React, { Component } from 'react';
import { fabric } from 'fabric';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './setFilters.css';
import Download from '../download/download';

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
    let amount = this.state.sliderVal / 100;

    if(image === null || this.state.currfilter === ''){
      return;
    }
    
    if(filter !== "blur"){
      let matrix;
      let rem;

      if(filter !== "vintage"){
        matrix = [
          0.393,0.769,0.189,0,0,
          0.349, 0.686, 0.168, 0, 0,
          0.272, 0.534, 0.131,0, 0,
          0 , 0, 0, 1, 0
        ]
      }else{
        matrix = [
          0.627, 0.320, -0.039, 0, 0.037,
          0.025, 0.644, 0.032, 0, 0.029,
          0.046, -0.085, 0.524, 0, 0.020,
          0 , 0, 0, 1, 0
        ]
      }

      for(let i = 0; i < 15; i++){
        if(i === 3 || i === 8 || i === 13){
          continue;
        } else if(i === 0 || i === 6 || i === 12){
          rem = 1 - matrix[i];
          matrix[i] = matrix[i] + (rem * (1 - amount));
        } else{
          if(filter === "sepia" && (i === 4 || i === 9 || i === 14)){
            continue;
          }
          matrix[i] = matrix[i] - (matrix[i] * (1 - amount));
        }
      };

      image.filters[idx]["matrix"] = matrix;
    } else{

      image.filters[idx][filter] = amount;
    }
    this.refreshCanvas(image, canvas);
  };

  addFilter = (btnclicked) => {
    let image = this.getImage();
    let canvas = this.getCanvas();
    let f = fabric.Image.filters;
    let filter;

    if(image == null){
      return;
    }

    switch(btnclicked){
      case "vintage":
        filter = new f.Vintage({ vintage: 0 });
        break;

      case "sepia":
        filter = new f.Sepia({ sepia: 0 });
        break; 

      default:
        filter = new f.Blur({ blur: 0.5 });
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

  toggleSlider = () => {
    let sliderDiv = document.getElementById("slider");
    sliderDiv.classList.toggle('slide');
  };

  selectFilter = (e) => {
    this.toggleSlider();
    let btnclicked = e.target.innerHTML.toLowerCase();
    let image = this.getImage();
    let exists = false;

    if(image === null){
      return;

    } else if(image.filters.length === 0){
      this.addFilter(btnclicked);
    } else{
      for(let i = 0; i < image.filters.length; i++){
          if(image.filters[i][btnclicked] !== undefined){
            this.setState ({ curridx: i, currfilter: btnclicked});
            exists = true;
            break;
          }
        }

        if(!exists){
          this.addFilter(btnclicked);
        }
      };
    };

  removeFilter = (e) => {
    let btnclicked = e.target.id;
    let canvas = this.getCanvas();
    let image = this.getImage();

    if(image === null || this.state.currfilter === ''){
      return;
    }

    if(btnclicked == "delBtnAll"){
      for(let i = 0; i < image.filters.length; i++){
        image.filters.splice(i);
      }
    } else{
      image.filters.splice(this.state.curridx, 1);
    }

    if(image.filters.length === 0){
      this.setState({curridx : 0, currfilter: ''});
    }

    this.refreshCanvas(image, canvas);
  }

  switchBtn = (e) =>{
    let btn = e.target;
    btn.classList.toggle('active');
  };

  changeSlideVal = (e) =>{
    this.setState({ sliderVal: e.target.value});
    this.updateFilter(this.state.curridx, this.state.currfilter);
  };

  render() {
    return (
      <div className="setfilters">
        <div className="sliderCon" id="slider">
          <input 
            type="range" 
            min="0" 
            max="100" 
            className="slider"
            value={this.state.sliderVal} 
            onChange={this.changeSlideVal}
            step="1" />
          <FontAwesomeIcon 
            icon={faTrashAlt} 
            id="delIcon" 
            onClick={this.removeFilter}
          />
        </div>
        <div className="btnDiv">
          <button 
          className="btn filterBtn"
          onClick={this.selectFilter}
          >
            Vintage
          </button>
          <button 
            className="btn filterBtn"
            onClick={this.selectFilter}
          >
            Sepia
          </button>
          <button 
          className="btn filterBtn"
          onClick={this.selectFilter}
          >
            Blur
          </button>
          <button 
          className="btn filterBtn deleteFilBtn"
          id="delBtnAll"
          onClick={this.removeFilter}
          >
            Normal
          </button>
        </div>
      </div>
    );
  }
}