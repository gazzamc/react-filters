import React, { Component, createRef } from 'react';
import { fabric } from 'fabric';
import "./preview.css";

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.prevImg = createRef();
    this.state = {
      canvas: {},
      image: {}
    }
  }

  componentDidMount() {

    console.log(document.getElementById("parent").width);
    /* Create Canvas */
    const canvas = new fabric.Canvas('c', {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 'rgba(0,0,0, 0.3)'
    });
    this.setState({canvas: canvas});
    this.props.callbackFromParent(canvas);
  }

  componentDidUpdate(image) {
    let canvas = this.state.canvas;

    if(this.props.image !== this.prevImg.current){
      /* Add Image to Canvas */
      let imgs = this.props.image;
      fabric.Image.fromURL(imgs, function(oImg) {
        canvas.add(oImg);
      });
    } else {
      /* Remove Image*/
      let getimage = canvas.getObjects("image");
      canvas.remove(getimage[0]);
    }
  }

  render() {
    return (
      <div className="preview" id="parent">
        <canvas id="c" />
      </div>
    );
  }
}