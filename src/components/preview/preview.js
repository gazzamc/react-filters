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
    /* Create Canvas */
    const canvas = new fabric.Canvas('c', {
      width: 300,
      height: 300
    });
    this.setState({canvas: canvas})
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
      <div className="container right">
        <canvas id="c" />
      </div>
    );
  }
}