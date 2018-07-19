import React, {Component} from 'react';
import './FilterComponent.css';

export default class FilterComponent extends Component {
    filterName = this.props.filter.action;
    propertyChange = () => {
        if (this.props.currentFilter !== this.filterName) {
            this.props.activeFilterChanged(this.filterName);
        } else {
            this.props.activeFilterChanged('');
        }
    };
    render() {
        const {
            filter,
            value
        } = this.props.filter;
        const imageFilter = {
            filter: `${filter}(${value})`
        };
        return (
            <div className={'filter-item ' + (this.props.currentFilter === this.filterName ? 'active' : '')}>
                <div className={'filter-title'}>{this.filterName}</div>
                <img className={'filter-image'} src={this.props.imageUrl} style={imageFilter} onClick={this.propertyChange} alt={''}/>
            </div>
        )
    }
}