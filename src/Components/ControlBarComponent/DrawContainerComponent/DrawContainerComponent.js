import React, { Component } from 'react';
import ColorPickerComponent from './ColorPickerComponent/ColorPickerComponent';
import DrawSizeComponent from './DrawSizeComponent/DrawSizeComponent';
import drawImage from './draw.png';

export default class FilterContainerComponent extends Component {
    render() {
        const {
            shapeSizeName,
            shapeSizeChanged
        } = this.props;
        const sizesArray = ['small', 'normal', 'large', 'huge'];
        const SizesRenderList = sizesArray.map((size, index) => {
            return (
                <DrawSizeComponent key={index} shapeSizeName={shapeSizeName} shapeSizeChanged={shapeSizeChanged} sizeName={size}/>
            );
        });
        return (
            <div>
                <div>
                    <img className={'control-image'} src={ drawImage } alt=""/>
                </div>
                <div className={'separator'}/>
                <div className={'filters'}>
                    <div className={'filters-list'}>
                        {SizesRenderList}
                    </div>
                </div>
                <div className={''}>
                    <ColorPickerComponent/>
                </div>
            </div>
        )
    }
}