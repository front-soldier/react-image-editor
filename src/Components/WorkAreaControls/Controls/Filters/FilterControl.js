import React, {Component} from 'react';

export default class FilterControl extends Component {
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
            <div className={'control-item filter-item ' + (this.props.currentFilter === this.filterName ? 'active' : '')}>
                <button className='control-button' onClick={this.propertyChange}>{this.filterName}</button>
            </div>
        )
    }
}