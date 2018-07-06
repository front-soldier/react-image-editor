import React, { Component } from 'react';
import WorkArea from './WorkArea';
import './WorkAreaContainer.css'

export default class WorkAreaContainer extends Component {
    render() {
        return (
            <div className='canvas-field'>
                <WorkArea currState={this.props.currState}></WorkArea>
            </div>
        );
    }
}