import React, { Component } from 'react';

export default class WorkArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(),
            context: {},
            paint: false,
        };
    }
    componentDidMount() {
        this.setState({
            context: this.state.canvasRef.current.getContext('2d')
        });
    }
    addClick = (mouseX, mouseY, dragging) => {
        this.props.canvasStateChanged(mouseX, mouseY, dragging, this.props.activeShape.shapeColor, this.props.activeShape.shapeSizeValue);
    };
    redraw = () => {
        const canvasContext = this.state.context;
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        canvasContext.lineJoin = "round";
        this.props.canvasState.clickX.forEach((el, index) => {
            canvasContext.beginPath();
            if (this.props.canvasState.clickDrag[index] && index) {
                canvasContext.moveTo(this.props.canvasState.clickX[index - 1], this.props.canvasState.clickY[index - 1]);
            } else {
                canvasContext.moveTo(this.props.canvasState.clickX[index] - 1, this.props.canvasState.clickY[index]);
            }
            canvasContext.lineTo(this.props.canvasState.clickX[index], this.props.canvasState.clickY[index]);
            canvasContext.closePath();
            canvasContext.strokeStyle = this.props.canvasState.clickColor[index];
            canvasContext.lineWidth = this.props.canvasState.clickSize[index];
            canvasContext.stroke();
        })
    };
    handleMouseDown = (ev) => {
        const mouseX = ev.pageX - this.state.canvasRef.current.offsetLeft;
        const mouseY = ev.pageY - this.state.canvasRef.current.offsetTop;
        this.addClick(mouseX, mouseY, false);
        this.redraw();
        this.setState({
            paint: true
        });
    };
    handleMouseMove = (ev) => {
        const mouseX = ev.pageX - this.state.canvasRef.current.offsetLeft;
        const mouseY = ev.pageY - this.state.canvasRef.current.offsetTop;
        if (this.state.paint) {
            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }
    };
    handleMouseUp = (ev) => {
        const mouseX = ev.pageX - this.state.canvasRef.current.offsetLeft;
        const mouseY = ev.pageY - this.state.canvasRef.current.offsetTop;
        this.addClick(mouseX, mouseY, false);
        this.redraw();
        this.setState({
            paint: false
        });
    };
    handleMouseLeave = (ev) => {
        this.setState({
            paint: false
        });
    };
    componentDidUpdate() {
        this.redraw();
    }
    render() {
        const background = {
            backgroundImage: 'url(' + this.props.image.imageUrl + ')'
        };
        const filters = {
            filter:
                `blur(${this.props.filters.blur}px) ` +
                `brightness(${this.props.filters.brightness}%) ` +
                `contrast(${this.props.filters.contrast}%) ` +
                `grayscale(${this.props.filters.grayscale}%) ` +
                `hue-rotate(${this.props.filters.hueRotate}deg) ` +
                `invert(${this.props.filters.invert}%) ` +
                `opacity(${this.props.filters.opacity}%) ` +
                `saturate(${this.props.filters.saturate}%) ` +
                `sepia(${this.props.filters.sepia}%)`
        };
        const canvasStyle = {...background, ...filters};
        return (
            <canvas className="work-canvas"
                    style={canvasStyle}
                    width={this.props.image.dimensions.width}
                    height={this.props.image.dimensions.height}
                    ref={this.state.canvasRef}
                    onMouseDown={(event) => {this.handleMouseDown(event)}}
                    onMouseMove={(event) => {this.handleMouseMove(event)}}
                    onMouseUp={(event) => {this.handleMouseUp(event)}}
                    onMouseLeave={(event) => {this.handleMouseLeave(event)}}>
            </canvas>
        );
    }
}