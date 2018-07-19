import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

export default class ColorPickerControl extends Component {
    state = {
        displayColorPicker: false,
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return (
            <div>
                <button onClick={ this.handleClick }>Pick Color</button>
                { this.state.displayColorPicker ? <div style={ popover }>
                    <div style={ cover } onClick={ this.handleClose }/>
                    <ChromePicker
                        color={this.props.shapeColor}
                        onChangeComplete={this.props.shapeColorChanged}
                        disableAlpha={true}/>
                </div> : null }
            </div>
        )
    }
}