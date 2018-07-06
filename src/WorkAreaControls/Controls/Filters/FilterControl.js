import React, {Component} from 'react';

export default class FilterControl extends Component {
    filterName = this.props.filterName;
    propertyChange = () => {
        this.props.activeFilterChanged(this.filterName);
    };
    render() {
        return (
            <div className={'control-item filter-item ' + (this.props.currentFilter === this.filterName ? 'active' : '')}>
                <button className='control-button' onClick={this.propertyChange}>{this.filterName}</button>
            </div>
        )
    }
}