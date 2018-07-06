import React, {Component} from 'react';
import './PickImageControl.css';

export default class PickImageControl extends Component {

    imagePicked = (event) => {
        const img = event.target.files[0];
        const reader  = new FileReader();
        const imgChanged = this.props.imageChanged.bind(this);
        reader.onloadend = () => {
            const imageUrl = reader.result;
            const i = new Image();
            i.onload = () => {
                const dimensions = this.calcImageDimensions(i);
                imgChanged({
                    imageUrl: imageUrl,
                    dimensions
                });
            };
            i.src = imageUrl;
        };
        reader.readAsDataURL(img);
    };
    calcImageDimensions = (i) => {
        const maxWidth = window.innerWidth - 300;
        const maxHeight = window.innerHeight;
        let width = i.naturalWidth;
        let height = i.naturalHeight;
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
        let dimensions = {
            width,
            height
        };
        return dimensions;
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