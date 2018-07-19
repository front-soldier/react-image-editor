import React, { Component } from 'react';
import ColorPickerComponent from './ColorPickerComponent/ColorPickerComponent';
import DrawSizeComponent from './DrawSizeComponent/DrawSizeComponent';
import './DrawContainerComponent.css'
import drawImage from './draw.png';

export default class FilterContainerComponent extends Component {
    render() {
        const {
            shapeSizeName,
            shapeSizeChanged,
            activeActionChanged,
            imageUrl,
            drawColor,
            drawColorChanged
        } = this.props;
        const sizesArray = ['small', 'normal', 'large', 'huge'];
        const SizesRenderList = sizesArray.map((size, index) => {
            return (
                <DrawSizeComponent key={index} shapeSizeName={shapeSizeName} shapeSizeChanged={shapeSizeChanged} sizeName={size}/>
            );
        });
        return (
            <div className={'draw-control-item'}>
                <img onClick={() => {activeActionChanged('')}} className={'control-bar-image'} src={ drawImage } alt=""/>
                <div className={'separator'}/>
                {imageUrl ? (
                    <div className={'draw-render'}>
                        <ColorPickerComponent
                            drawColor={drawColor}
                            drawColorChanged={drawColorChanged}
                        />
                        <div className={'draw-size-section'}>
                            <div className={'draw-size-title'}>Brush size</div>
                            <div className={'draw-size-list'}>
                                {SizesRenderList}
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