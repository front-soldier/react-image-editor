import React, { Component } from 'react';

export default class WorkArea(props) {
    const canvasStyle = {
        backgroundImage: 'url(' + props.currState.image.imageUrl + ')'
    };
    const filters = `blur(${props.currState.filters.blur}px) `+
                    `brightness(${props.currState.filters.brightness}%) `+
                    `contrast(${props.currState.filters.contrast}%) `+
                    `grayscale(${props.currState.filters.grayscale}%) `+
                    `hue-rotate(${props.currState.filters.hueRotate}deg) `+
                    `invert(${props.currState.filters.invert}%) `+
                    `opacity(${props.currState.filters.opacity}%) `+
                    `saturate(${props.currState.filters.saturate}%) `+
                    `sepia(${props.currState.filters.sepia}%)`;
    canvasStyle.filter = filters;
    return (
        <canvas className="work-canvas" style={canvasStyle} width={props.currState.image.dimensions.width} height={props.currState.image.dimensions.height}></canvas>
    );
}