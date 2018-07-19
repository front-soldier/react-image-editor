import React, { Component } from 'react';
import FilterComponent from './FilterComponent/FilterComponent';
import RangeBarComponent from './RangeBarComponent/RangeBarComponent'

import './FilterContainerComponent.css'
import filterImage from './filter.png';

export default class FilterContainerComponent extends Component {
    render() {
        const {
            activeFilterChanged,
            activeFilter,
            activeActionChanged,
            imageUrl
        } = this.props;
        const filtersArray = ['blur', 'brightness', 'contrast', 'grayscale', 'hueRotate', 'invert', 'opacity', 'saturate', 'sepia'];
        const FiltersRenderList = filtersArray.map((filter, index) => {
            return (
                <FilterComponent key={index} activeFilterChanged={activeFilterChanged} currentFilter={activeFilter.currentFilter} filterName={filter} imageUrl={imageUrl}/>
            );
        });
        return (
            <div className={'filter-control-item'}>
                <img onClick={() => {activeActionChanged('')}} className={'control-bar-image'} src={ filterImage } alt=""/>
                <div className={'separator'}/>
                    {imageUrl ? (
                        <div className={'filters-render'}>
                            <div className={'filters-list'}>
                                {FiltersRenderList}
                            </div>
                            <RangeBarComponent activeFilter={activeFilter}/>
                        </div>
                    ) : (
                        <div>Please upload image</div>
                    )}
            </div>
        )
    }
}