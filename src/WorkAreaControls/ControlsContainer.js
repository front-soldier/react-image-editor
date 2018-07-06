import React, { Component } from 'react';
import './ControlsContainer.css';
import PickImageControl from './Controls/PickImage/PickImageControl';

import WriteLineControl from './Controls/Shapes/WriteLineControl';
import WriteRectangleControl from './Controls/Shapes/WriteRectangleControl';

import FilterControl from './Controls/Filters/FilterControl';

import FiltersRangeBar from './Controls/RangeBar/FiltersRangeBar';

export default class ControlsContainer extends Component {
    render() {
        const filtersArray = ['blur', 'brightness', 'contrast', 'grayscale', 'hueRotate', 'invert', 'opacity', 'saturate', 'sepia'];
        let FiltersRenderList = filtersArray.map((filter) => {
            return (
                <FilterControl activeFilterChanged={this.props.activeFilterChanged} currentFilter={this.props.activeFilter.currentFilter} filterName={filter}></FilterControl>
            );
        });
        return (
            <div className='controls-field'>
                <div className='controls pick-image-controls'>
                    <PickImageControl imageChanged={this.props.imageChanged}></PickImageControl>
                </div>
                <div className='controls shape-controls'>
                    <WriteLineControl activeShapeChanged={this.props.activeShapeChanged}></WriteLineControl>
                    <WriteRectangleControl activeShapeChanged={this.props.activeShapeChanged}></WriteRectangleControl>
                </div>
                <div className='controls filter-controls'>
                    {FiltersRenderList}
                </div>
                <div>
                    <FiltersRangeBar filterChanged={this.props.filterChanged} activeFilter={this.props.activeFilter}></FiltersRangeBar>
                </div>
            </div>
        )
    }
}