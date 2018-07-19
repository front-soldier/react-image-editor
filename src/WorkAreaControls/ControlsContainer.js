import React, { Component } from 'react';
import './ControlsContainer.css';
import PickImageControl from './Controls/PickImage/PickImageControl';
import WriteLineControl from './Controls/Shapes/WriteLineControl';
import WriteRectangleControl from './Controls/Shapes/WriteRectangleControl';
import FilterControl from './Controls/Filters/FilterControl';
import FiltersRangeBar from './Controls/RangeBar/FiltersRangeBar';
import ColorPickerControl from './Controls/ColorPicker/ColorPickerControl';
import ShapeSizeControl from './Controls/ShapeSize/ShapeSizeControl';

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
                    <PickImageControl imageChanged={this.props.imageChanged}></PickImageControl>
                </div>
                <div className='controls shape-controls'>
                    <WriteLineControl currentShapeChanged={this.props.currentShapeChanged}></WriteLineControl>
                    <WriteRectangleControl currentShapeChanged={this.props.currentShapeChanged}></WriteRectangleControl>
                </div>
                <div className='controls filter-controls'>
                    {FiltersRenderList}
                </div>
                <div>
                    <FiltersRangeBar filterChanged={this.props.filterChanged} activeFilter={this.props.activeFilter}></FiltersRangeBar>
                </div>
                <div>
                    <ColorPickerControl
                        shapeColor={this.props.shapeColor}
                        shapeColorChanged={this.props.shapeColorChanged}/>
                </div>
                <div className='controls'>
                    {SizesRenderList}
                </div>
            </div>
        )
    }
}