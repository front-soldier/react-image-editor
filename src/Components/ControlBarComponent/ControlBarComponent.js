import React, { PureComponent } from 'react';
import './ControlBarComponent.css';
import DownloadComponent from './DownloadComponent/DownloadComponent';
import FilterContainerComponent from './FilterContainerComponent/FilterContainerComponent';
import CropContainerComponent from './CropContainerComponent/CropContainerComponent';
import DrawContainerComponent from './DrawContainerComponent/DrawContainerComponent';

import filterImage from './FilterContainerComponent/filter.png';
import drawImage from './DrawContainerComponent/draw.png';
import cropImage from './CropContainerComponent/crop.png';

export default class ControlBarComponent extends PureComponent {
    render() {
        const {
            drawActiveChanged,
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
            activeActionChanged
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
                    />
                ); break;
                case 'crop': renderList = (<CropContainerComponent/>); break;
                case 'draw': renderList = (<DrawContainerComponent/>); break;
            }
        }

        return (
            <div className={'control-bar'}>
                { renderList }
                <DownloadComponent filters={filters} imageUrl={imageUrl}/>
            </div>
        )
    }
}