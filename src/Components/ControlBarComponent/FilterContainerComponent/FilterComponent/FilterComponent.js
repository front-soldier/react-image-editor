import React, {Component} from 'react';
import './FilterComponent.css';

export default class FilterComponent extends Component {
    filterName = this.props.filterName;
    propertyChange = () => {
        if (this.props.currentFilter !== this.filterName) {
            this.props.activeFilterChanged(this.filterName);
        } else {
            this.props.activeFilterChanged('');
        }
    };
    render() {
        return (
            <div className={'filter-item ' + (this.props.currentFilter === this.filterName ? 'active' : '')}>
                <div className={'filter-title'}>{this.filterName}</div>
                <img className={'filter-image'} src={this.props.imageUrl} onClick={this.propertyChange} alt={''}/>
            </div>
        )
    }
}