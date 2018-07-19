import React, { Component } from 'react';

export default class ApplyComponent extends Component {

    render() {
        if (!this.props.imageUrl) {
            return null
        }
        return (
            <div className={'download-panel'}>
                <button onClick={this.props.cropHandle} className={'download-button'}>Apply</button>
            </div>
        );
    }
}
