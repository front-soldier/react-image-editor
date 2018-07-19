import React, { Component } from 'react';
import WorkArea from './WorkArea';
import './WorkAreaContainer.css'

export default class WorkAreaContainer extends Component {
    render() {
        return (
            <div className='canvas-field'>
                <WorkArea
                    currState={this.props.currState}
                    activeShape={this.props.activeShape}
                    filters={this.props.filters}
                    image={this.props.image}
                    canvasState={this.props.canvasState}
                    canvasStateChanged={this.props.canvasStateChanged}
                    addStory={this.props.addStory}/>
            </div>
        );
    }
}