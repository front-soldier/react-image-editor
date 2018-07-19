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
        const canvasState = this.props.canvasState;
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        canvasContext.lineJoin = "round";
        canvasState.clickX.forEach((el, index) => {
            canvasContext.beginPath();
            if (canvasState.clickDrag[index] && index) {
                canvasContext.moveTo(canvasState.clickX[index - 1], canvasState.clickY[index - 1]);
            } else {
                canvasContext.moveTo(canvasState.clickX[index] - 1, canvasState.clickY[index]);
            }
            canvasContext.lineTo(canvasState.clickX[index], canvasState.clickY[index]);
            canvasContext.closePath();
            canvasContext.strokeStyle = canvasState.clickColor[index];
            canvasContext.lineWidth = canvasState.clickSize[index];
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
        }, () => {
            this.props.addStory();
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
        const { filters, image } = this.props;
        const background = {
            backgroundImage: 'url(' + image.imageUrl + ')'
        };
        const resultFilters = {
            filter:
                `blur(${filters.blur}px) ` +
                `brightness(${filters.brightness}%) ` +
                `contrast(${filters.contrast}%) ` +
                `grayscale(${filters.grayscale}%) ` +
                `hue-rotate(${filters.hueRotate}deg) ` +
                `invert(${filters.invert}%) ` +
                `opacity(${filters.opacity}%) ` +
                `saturate(${filters.saturate}%) ` +
                `sepia(${filters.sepia}%)`
        };
        const canvasStyle = {...background, ...resultFilters};
        return (
            <canvas className="work-canvas"
                    style={canvasStyle}
                    width={image.dimensions.width}
                    height={image.dimensions.height}
                    ref={this.state.canvasRef}
                    onMouseDown={(event) => {this.handleMouseDown(event)}}
                    onMouseMove={(event) => {this.handleMouseMove(event)}}
                    onMouseUp={(event) => {this.handleMouseUp(event)}}
                    onMouseLeave={(event) => {this.handleMouseLeave(event)}}>
            </canvas>
        );
    }
}