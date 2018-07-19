import React, { Component } from 'react';
import './ControlBarComponent.css';
import DownloadComponent from './DownloadComponent/DownloadComponent';
import FilterContainerComponent from './FilterContainerComponent/FilterContainerComponent';
import CropContainerComponent from './CropContainerComponent/CropContainerComponent';
import DrawContainerComponent from './DrawContainerComponent/DrawContainerComponent';
import ApplyComponent from './ApplyComponent/ApplyComponent';

import filterImage from './FilterContainerComponent/filter.png';
import drawImage from './DrawContainerComponent/draw.png';
import cropImage from './CropContainerComponent/crop.png';

export default class ControlBarComponent extends Component {
    render() {
        const {
            filterChanged,
            activeFilter,
            activeFilterChanged,
            addStory,
            drawColor,
            drawColorChanged,
            shapeSizeName,
            shapeSizeChanged,
            filters,
            imageUrl,
            activeAction,
            activeActionChanged,
            cropHandle,
            cropperHeight,
            cropperWidth,
            cropperDimensionsChanged
        } = this.props;

        let renderList;
        if (!activeAction) {
            renderList = (
                <div className={'control-items'}>
                    <img onClick={() => { activeActionChanged('filter') }} className={'control-bar-image'} src={filterImage} alt=""/>
                    <img onClick={() => { activeActionChanged('crop') }} className={'control-bar-image'} src={cropImage} alt=""/>
                    <img onClick={() => { activeActionChanged('draw') }} className={'control-bar-image'} src={drawImage} alt=""/>
                </div>
            )
        } else {
            switch (activeAction) {
                case 'filter': renderList = (
                    <FilterContainerComponent
                        activeFilterChanged={activeFilterChanged}
                        activeFilter={activeFilter}
                        activeActionChanged={activeActionChanged}
                        imageUrl={imageUrl}
                        addStory={addStory}
                        filterChanged={filterChanged}
                    />
                ); break;
                case 'crop': renderList = (
                    <CropContainerComponent
                        activeActionChanged={activeActionChanged}
                        imageUrl={imageUrl}
                        cropperHeight={cropperHeight}
                        cropperWidth={cropperWidth}
                        cropperDimensionsChanged={cropperDimensionsChanged}
                    />
                ); break;
                case 'draw': renderList = (
                    <DrawContainerComponent
                        shapeSizeName={shapeSizeName}
                        shapeSizeChanged={shapeSizeChanged}
                        activeActionChanged={activeActionChanged}
                        imageUrl={imageUrl}
                        drawColor={drawColor}
                        drawColorChanged={drawColorChanged}
                    />
                ); break;
                default: break;
            }
        }

        return (
            <div className={'control-bar'}>
                { renderList }
                {activeAction === 'crop' ? (
                    <ApplyComponent cropHandle={cropHandle} imageUrl={imageUrl}/>
                ) : (
                    <DownloadComponent filters={filters} imageUrl={imageUrl}/>
                )}
            </div>
        )
    }
}