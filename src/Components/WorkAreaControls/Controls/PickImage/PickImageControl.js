import React, {Component} from 'react';
import './PickImageControl.css';

export default class PickImageControl extends Component {

    imagePicked = (event) => {
        const img = event.target.files[0];
        const reader  = new FileReader();
        const imgChanged = this.props.imageChanged.bind(this);
        reader.onloadend = () => {
            const imageUrl = reader.result;
            const resultImage = new Image();
            resultImage.onload = () => {
                const dimensions = this.calcImageDimensions(resultImage);
                imgChanged({
                    imageUrl: imageUrl,
                    dimensions
                });
            };
            resultImage.src = imageUrl;
        };
        reader.readAsDataURL(img);
    };
    calcImageDimensions = (resultImage) => {
        const rightControlPanel = 300;
        const canvasPadding = 100;
        const maxWidth = window.innerWidth - rightControlPanel;
        const maxHeight = window.innerHeight - canvasPadding;
        let width = resultImage.naturalWidth;
        let height = resultImage.naturalHeight;
        let ratio = 0;
        if (width > maxWidth) {
            ratio = maxWidth / width;
            height = height * ratio;
            width = width * ratio;
        }
        if (height > maxHeight) {
            ratio = maxHeight / height;
            width = width * ratio;
            height = height * ratio;
        }
        return {
            width,
            height
        };
    };
    render() {
        return (
            <div className='control-item pick-image-item'>
                <input id='file' className='file-input' type="file" onChange={(event) => { this.imagePicked(event) }}/>
                <label htmlFor="file" className='file-label'>Please, choose a file</label>
            </div>
        );
    }
}