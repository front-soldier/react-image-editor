import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import './ColorPickerComponent.css';

export default class ColorPickerComponent extends Component {
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
            top: '80px'
        };
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        };
        return (
            <div className={'color-picker'}>
                <div className={'color-picker-title'}>Color Picker</div>
                <button className={'color-picker-button'} onClick={ this.handleClick }/>
                { this.state.displayColorPicker ? <div style={ popover }>
                    <div style={ cover } onClick={ this.handleClose }/>
                    <ChromePicker
                        color={this.props.drawColor}
                        onChangeComplete={this.props.drawColorChanged}
                        disableAlpha={true}/>
                </div> : null }
            </div>
        )
    }
}