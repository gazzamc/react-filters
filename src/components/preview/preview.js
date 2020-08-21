import React, { Component, createRef } from 'react';
import { fabric } from 'fabric';
import "./preview.css";

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.prevImg = createRef();
    this.state = {
      zoom: 50,
      canvas: {},
      image: {},
    }
  }

  setZoom = (e) => {
    let canvas = this.state.canvas;
    this.setState({zoom: e.target.value});
    canvas.setZoom(this.state.zoom / 100);
  }

  componentDidMount() {
    const canvas = new fabric.Canvas('c', {
      width: window.innerWidth,
      height: window.innerHeight
    });
    this.setState({canvas: canvas});
    this.props.callbackFromParent(canvas);
  }

  componentDidUpdate() {
    let canvas = this.state.canvas;
    let imgs = this.props.image;

    if(this.props.image !== this.prevImg.current){
      /* Prevent images duplicating when zooming */
      if(canvas.getObjects("image")[0] === undefined){
        fabric.Image.fromURL(imgs, function(oImg) {
          canvas.add(oImg);
          canvas.centerObject(oImg);
          oImg.setCoords()
        });
      }
    } else {
      let getimage = canvas.getObjects("image");
      canvas.remove(getimage[0]);
    }
  }

  render() {
    return (
      <div className="preview" id="parent">
        <canvas id="c" />
        <div className="zoomDiv" id="zoomSlider">
          <input 
            type="range" 
            min="1" 
            max="99"
            orient="vertical"
            className="zoomSlider"
            value={this.state.zoom} 
            onChange={this.setZoom}
            step="1" />
        </div>
      </div>
    );
  }
}