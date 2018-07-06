import React, {Component} from 'react';

export default class WriteLineControl extends Component {
    writeLineClick = () => {
        this.props.activeShapeChanged('line');
    };
    render() {
        return (
            <div className='control-item shape-item'>
                <button className='control-button' onClick={this.writeLineClick}>Line</button>
            </div>
        )
    }
}