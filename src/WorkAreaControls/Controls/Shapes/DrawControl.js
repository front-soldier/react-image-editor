import React, {Component} from 'react';

export default class DrawControl extends Component {
    writeLineClick = () => {
        this.props.currentShapeChanged('draw');
    };
    render() {
        return (
            <div className='control-item shape-item'>
                <button className='control-button' onClick={this.writeLineClick}>Line</button>
            </div>
        )
    }
}