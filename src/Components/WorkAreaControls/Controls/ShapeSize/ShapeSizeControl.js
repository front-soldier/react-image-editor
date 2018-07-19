import React, {Component} from 'react';

export default class ShapeSizeControl extends Component {
    sizeName = this.props.sizeName;
    propertyChange = () => {
        this.props.shapeSizeChanged(this.sizeName);
    };
    render() {
        return (
            <div className={'control-item filter-item ' + (this.props.shapeSizeName === this.sizeName ? 'active' : '')}>
                <button className='control-button' onClick={this.propertyChange}>{this.sizeName}</button>
            </div>
        )
    }
}