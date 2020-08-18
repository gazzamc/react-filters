import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import "./preview.css";

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.prevImg = createRef();
  }

  componentDidUpdate(image) {
    const imageURL = this.prevImg.current;
    if(imageURL != this.props.image){
      if(this.props.image == null && this.prevImg.hidden == null){
        imageURL.src = "";
        imageURL.hidden = true;
      } else {
        imageURL.src = this.props.image;
        imageURL.hidden = false;
      }
    }
  }

  render() {
    return (
      <div id="image-prev">
        <img ref={this.prevImg} src="" hidden/>
      </div>
    );
  }
}