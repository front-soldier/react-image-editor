import React, { Component } from 'react';
import './DownloadComponent.css'

export default class DownloadComponent extends Component {
  clickHandler = () => {
      const result = document.createElement('canvas');
      const canvas = document.querySelector('.work-canvas');
      result.width = canvas.width;
      result.height = canvas.height;
      const context = result.getContext('2d');
      const {
          filters,
          imageUrl
      } = this.props;
      context.filter = `blur(${filters.blur}px) `
                           + `brightness(${filters.brightness}%) `
                           + `contrast(${filters.contrast}%) `
                           + `grayscale(${filters.grayscale}%) `
                           + `hue-rotate(${filters.hueRotate}deg) `
                           + `invert(${filters.invert}%) `
                           + `opacity(${filters.opacity}%) `
                           + `saturate(${filters.saturate}%) `
                           + `sepia(${filters.sepia}%)`;
      const image = new Image();
      image.onload = function () {
          context.drawImage(this, 0, 0, canvas.width, canvas.height);
          context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
          const link = document.createElement('a');
          link.href = result.toDataURL();
          link.download = 'picture.png';
          link.click();
      };
      image.src = imageUrl;
  };

  render() {
      if (!this.props.imageUrl) {
          return null
      }
      return (
          <div className={'download-panel'}>
              <button onClick={this.clickHandler} className={'download-button'}>Download</button>
          </div>
      );
  }
}
