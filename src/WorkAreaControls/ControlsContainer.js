import React, { Component } from 'react';
import './ControlsContainer.css';
import PickImageControl from './Controls/PickImage/PickImageControl';
import WriteLineControl from './Controls/Shapes/WriteLineControl';
import WriteRectangleControl from './Controls/Shapes/WriteRectangleControl';
import FilterControl from './Controls/Filters/FilterControl';
import FiltersRangeBar from './Controls/RangeBar/FiltersRangeBar';
import ColorPickerControl from './Controls/ColorPicker/ColorPickerControl';
import ShapeSizeControl from './Controls/ShapeSize/ShapeSizeControl';
import DownloadControl from './Controls/Download/DownloadControl';

export default class ControlsContainer extends Component {
    render() {
        const filtersArray = ['blur', 'brightness', 'contrast', 'grayscale', 'hueRotate', 'invert', 'opacity', 'saturate', 'sepia'];
        const FiltersRenderList = filtersArray.map((filter, index) => {
            return (
                <FilterControl key={index} activeFilterChanged={this.props.activeFilterChanged} currentFilter={this.props.activeFilter.currentFilter} filterName={filter}/>
            );
        });
        const sizesArray = ['small', 'normal', 'large', 'huge'];
        let SizesRenderList = sizesArray.map((size, index) => {
            return (
                <ShapeSizeControl key={index} shapeSizeName={this.props.shapeSizeName} shapeSizeChanged={this.props.shapeSizeChanged} sizeName={size}/>
            );
        });
        return (
            <div className='controls-field'>
                <div className='controls pick-image-controls'>
                    <PickImageControl imageChanged={this.props.imageChanged}/>
                </div>
                <div className='controls shape-controls'>
                    <WriteLineControl currentShapeChanged={this.props.currentShapeChanged}/>
                    <WriteRectangleControl currentShapeChanged={this.props.currentShapeChanged}/>
                </div>
                <div className='controls filter-controls'>
                    {FiltersRenderList}
                </div>
                <div>
                    <FiltersRangeBar filterChanged={this.props.filterChanged} activeFilter={this.props.activeFilter} addStory={this.props.addStory}/>
                </div>
                <div>
                    <ColorPickerControl
                        shapeColor={this.props.shapeColor}
                        shapeColorChanged={this.props.shapeColorChanged}/>
                </div>
                <div className='controls'>
                    {SizesRenderList}
                </div>
                <div className='controls'>
                    <DownloadControl filters={this.props.filters} imageUrl={this.props.imageUrl}/>
                </div>
                {this.props.children}
            </div>
        )
    }
}