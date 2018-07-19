import React, { Component } from 'react';
import './CropContainerComponent.css';
import cropImage from './crop.png';

export default class CropContainerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heightRef: React.createRef(),
            widthRef: React.createRef()
        }
    }
    cropperDimensionsHandler = () => {
        this.props.cropperDimensionsChanged({
            height: this.state.heightRef.current.value,
            width: this.state.widthRef.current.value,
        });
    };
    render() {
        const {
            activeActionChanged,
            imageUrl,
            cropperHeight,
            cropperWidth
        } = this.props;
        return (
            <div className={'crop-control-item'}>
                <img onClick={() => {activeActionChanged('')}} className={'control-bar-image'} src={ cropImage } alt=""/>
                <div className={'separator'}/>
                {imageUrl ? (
                    <div className={'crop-render'}>
                        <div className={'crop-area'}>
                            <div className={'crop-custom'}>Custom</div>
                            <div className={'crop-rectangle'}>
                                <div className='topbottom'/>
                                <div className='leftright'/>
                            </div>
                        </div>
                        <div className={'crop-dimensions'}>
                            <div>
                                <label className={'crop-title'} htmlFor="crop-height">H</label>
                                <input ref={this.state.heightRef} value={cropperHeight} onChange={this.cropperDimensionsHandler} className={'crop-input'} type="text" id={'crop-height'}/>
                            </div>
                            <div>
                                <label className={'crop-title'} htmlFor="crop-width">W</label>
                                <input ref={this.state.widthRef} value={cropperWidth} onChange={this.cropperDimensionsHandler} className={'crop-input'} type="text" id={'crop-width'}/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Please upload image</div>
                )}
            </div>
        )
    }
}