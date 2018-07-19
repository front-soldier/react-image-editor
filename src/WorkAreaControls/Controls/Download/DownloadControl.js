import React, {Component} from 'react';

export default class DownloadControl extends Component {
    clickHandler = () => {
        let result = document.createElement('canvas');
        const canvas = document.querySelector('.work-canvas');
        result.width = canvas.width;
        result.height = canvas.height;
        const context = result.getContext('2d');
        context.filter = `blur(${this.props.filters.blur}px) ` +
                         `brightness(${this.props.filters.brightness}%) ` +
                         `contrast(${this.props.filters.contrast}%) ` +
                         `grayscale(${this.props.filters.grayscale}%) ` +
                         `hue-rotate(${this.props.filters.hueRotate}deg) ` +
                         `invert(${this.props.filters.invert}%) ` +
                         `opacity(${this.props.filters.opacity}%) ` +
                         `saturate(${this.props.filters.saturate}%) ` +
                         `sepia(${this.props.filters.sepia}%)`;
        let image = new Image();
        image.onload = function() {
            context.drawImage(this, 0, 0, canvas.width, canvas.height);
            context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
            const link = document.createElement('a');
            link.href = result.toDataURL();
            link.download = 'test.png';
            link.click();
        };
        image.src = this.props.imageUrl;
    };
    render() {
        return (
            <a onClick={this.clickHandler}>
                Download
            </a>
        )
    }
}