import React, { Component } from 'react';
import './download.css';

export default class Download extends Component {
    download = () => {
        let option = document.getElementById("dlOpt").value;
        let image = this.props.canvas.getObjects("image")[0];
        let link = document.createElement('a');

        link.href = image.toDataURL();
        link.download = "image." + option;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        return (
        <div className="download">
            <select name="dlOpt" id="dlOpt" className="drop-down">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
            </select>
            <button 
                className="btn filterBtn"
                onClick={this.download}
            >
                Download 
            </button>
        </div>
        );
  }
}
