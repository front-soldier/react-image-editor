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
            imageUrl,
            addStory,
            filterChanged
        } = this.props;
        const filtersArray = [
            {
                action: 'blur',
                filter: 'blur',
                value: '2px'
            },
            {
                action: 'brightness',
                filter: 'brightness',
                value: '200%'
            },
            {
                action: 'contrast',
                filter: 'contrast',
                value: '300%'
            },
            {
                action: 'grayscale',
                filter: 'grayscale',
                value: '100%'
            },
            {
                action: 'hueRotate',
                filter: 'hue-rotate',
                value: '180deg'
            },
            {
                action: 'invert',
                filter: 'invert',
                value: '100%'
            },
            {
                action: 'opacity',
                filter: 'opacity',
                value: '50%'
            },
            {
                action: 'saturate',
                filter: 'saturate',
                value: '300%'
            },
            {
                action: 'sepia',
                filter: 'sepia',
                value: '100%'
            }];
        const FiltersRenderList = filtersArray.map((filter, index) => {
            return (
                <FilterComponent key={index} activeFilterChanged={activeFilterChanged} currentFilter={activeFilter.currentFilter} filter={filter}  imageUrl={imageUrl}/>
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
                            <RangeBarComponent
                                activeFilter={activeFilter}
                                addStory={addStory}
                                filterChanged={filterChanged}
                            />
                        </div>
                    ) : (
                        <div>Please upload image</div>
                    )}
            </div>
        )
    }
}