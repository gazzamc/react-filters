import React, { Component, createRef } from 'react';
import "./upload.css";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.btn = createRef();
    this.delete = createRef();
  }

  deleteImage = () => {
    const btn = this.btn.current;
    const deleteBtn = this.delete.current;
    btn.hidden = false;
    deleteBtn.hidden = true;
    this.props.callbackFromParent(null);
  }

  handleClick = (e) => {
    if(e.target.files.length === 0 || 
      e.target.files[0].type.split("/")[0] !== "image"){
      return false;
    }

    const btn = this.btn.current;
    const deleteBtn = this.delete.current;
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      this.props.callbackFromParent(window.URL.createObjectURL(file));
      btn.hidden = true;
      deleteBtn.hidden = false;
    };
    reader.readAsText(file);
  }

  render() {
    return (
      <div className="container left">
        <label 
          ref={this.btn}
          className="btn btn-upload"
          hidden={false}
          >
          <input 
            type="file" 
            hidden={true}
            accept='.jpg,.jpeg,.png'
            onClick={event => event.target.value = null}
            onChange={this.handleClick}
          />
          +
        </label>
        <button 
          ref={this.delete} 
          className="btn" 
          hidden={true}
          onClick={this.deleteImage}
          >
          X
          </button>
      </div>
    );
  }
}