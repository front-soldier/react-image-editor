import React, { Component } from 'react';
import WorkAreaComponent from './WorkAreaComponent';
import PickImageComponent from './PickImageComponent/PickImageComponent';
import './WorkAreaContainerComponent.css'

export default class WorkAreaContainerComponent extends Component {
    render() {
        const imageUrl = this.props.image.imageUrl;
        const {
            activeDraw,
            filters,
            image,
            canvasState,
            canvasStateChanged,
            activeAction,
            addStory,
            cropper,
            cropperDimensionsChanged,
            imageChanged
        } = this.props;
        return (
            <div className='edit-section'>
                {imageUrl ? (
                        <WorkAreaComponent
                            activeDraw={activeDraw}
                            filters={filters}
                            image={image}
                            canvasState={canvasState}
                            canvasStateChanged={canvasStateChanged}
                            activeAction={activeAction}
                            addStory={addStory}
                            cropper={cropper}
                            cropperDimensionsChanged={cropperDimensionsChanged}
                        />
                ) : (
                    <PickImageComponent imageChanged={imageChanged}/>
                )}
            </div>
        );
    }
}