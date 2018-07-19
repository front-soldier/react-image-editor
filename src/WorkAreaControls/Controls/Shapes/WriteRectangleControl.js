import React, {Component} from 'react';

export default class WriteRectangleControl extends Component {
    writeRectangleClick = () => {
        this.props.currentShapeChanged('rectangle');
    };
    render() {
        return (
            <div className='control-item shape-item'>
                <button className='control-button' onClick={this.writeRectangleClick}>Rectangle</button>
            </div>
        )
    }
}