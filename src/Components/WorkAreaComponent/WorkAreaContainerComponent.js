import React, { PureComponent } from 'react';
import WorkAreaComponent from './WorkAreaComponent';
import PickImageComponent from './PickImageComponent/PickImageComponent';
import './WorkAreaContainerComponent.css'

export default class WorkAreaContainerComponent extends PureComponent {
    render() {
        const imageUrl = this.props.image.imageUrl;
        return (
            <div className='edit-section'>
                {imageUrl ? (
                        <WorkAreaComponent
                            currState={this.props.currState}
                            activeDraw={this.props.activeDraw}
                            filters={this.props.filters}
                            image={this.props.image}
                            canvasState={this.props.canvasState}
                            canvasStateChanged={this.props.canvasStateChanged}
                            addStory={this.props.addStory}/>
                ) : (
                    <PickImageComponent imageChanged={this.props.imageChanged}/>
                )}
            </div>

        );
    }
}