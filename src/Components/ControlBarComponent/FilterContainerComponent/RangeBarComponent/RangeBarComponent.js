import React, { Component } from 'react';
import './RangeBarComponent.css'

export default class RangeBarComponent extends Component {

    filterValueChanged = (event) => {
        const filter = {
            type: this.props.activeFilter.currentFilter,
            value: event.target.value
        };
        this.props.filterChanged(filter);
    };

    handleMouseUp = () => {
        this.props.addStory();
    };

    render() {
        let min, max;
        switch (this.props.activeFilter.currentFilter) {
            case 'blur':
                min = 0;
                max = 100;
                break;
            case 'brightness':
                min = 0;
                max = 1000;
                break;
            case 'contrast':
                min = 0;
                max = 1000;
                break;
            case 'grayscale':
                min = 0;
                max = 100;
                break;
            case 'hueRotate':
                min = 0;
                max = 360;
                break;
            case 'invert':
                min = 0;
                max = 100;
                break;
            case 'opacity':
                min = 0;
                max = 100;
                break;
            case 'saturate':
                min = 0;
                max = 1000;
                break;
            case 'sepia':
                min = 0;
                max = 100;
                break;
            default:
                min = 0;
                max = 0;
        }
        return (
            <div className="rangebar-container">
                <div className={'minus-image'}/>
                <input className={'rangebar' + (!this.props.activeFilter.filterValue ? ' disabled ' : '')}
                       type="range"
                       max={max}
                       min={min}
                       value={this.props.activeFilter.filterValue}
                       onChange={(event) => {this.filterValueChanged(event)}}
                       onMouseUp={this.handleMouseUp}/>
                <div className={'plus-image'}/>
            </div>
        );
    }
}