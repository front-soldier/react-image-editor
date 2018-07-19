import React, { Component } from 'react';

export default class WorkArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(),
            context: {},
            paint: false,
            clickX: [],
            clickY: [],
            clickDrag: [],
            clickColor: [],
            clickSize: [],
        };
    }
    componentDidMount() {
        this.setState({
            context: this.state.canvasRef.current.getContext('2d')
        });
    }
    addClick = (mouseX, mouseY, dragging) => {
        this.state.clickX.push(mouseX);
        this.state.clickY.push(mouseY);
        this.state.clickDrag.push(dragging);
        this.state.clickColor.push(this.props.activeShape.shapeColor);
        this.state.clickSize.push(this.props.activeShape.shapeSizeValue);
    };
    redraw = () => {
        const canvasContext = this.state.context;
        canvasContext.clearRect(0, 0, this.state.context.canvas.width, this.state.context.canvas.height);
        canvasContext.lineJoin = "round";
        this.state.clickX.forEach((el, index) => {
            this.state.context.beginPath();
            if (this.state.clickDrag[index] && index) {
                this.state.context.moveTo(this.state.clickX[index - 1], this.state.clickY[index - 1]);
            } else {
                this.state.context.moveTo(this.state.clickX[index] - 1, this.state.clickY[index]);
            }
            canvasContext.lineTo(this.state.clickX[index], this.state.clickY[index]);
            canvasContext.closePath();
            canvasContext.strokeStyle = this.state.clickColor[index];
            canvasContext.lineWidth = this.state.clickSize[index];
            canvasContext.stroke();
        })
    };
    handleMouseDown = (ev) => {
        const mouseX = ev.pageX - this.state.canvasRef.current.offsetLeft;
        const mouseY = ev.pageY - this.state.canvasRef.current.offsetTop;
        this.addClick(mouseX, mouseY);
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
    handleMouseUp = () => {
        this.setState({
            paint: false
        });
    };
    render() {
        const background = {
            backgroundImage: 'url(' + this.props.currState.image.imageUrl + ')'
        };
        const filters = {
            filter:
                `blur(${this.props.currState.filters.blur}px) ` +
                `brightness(${this.props.currState.filters.brightness}%) ` +
                `contrast(${this.props.currState.filters.contrast}%) ` +
                `grayscale(${this.props.currState.filters.grayscale}%) ` +
                `hue-rotate(${this.props.currState.filters.hueRotate}deg) ` +
                `invert(${this.props.currState.filters.invert}%) ` +
                `opacity(${this.props.currState.filters.opacity}%) ` +
                `saturate(${this.props.currState.filters.saturate}%) ` +
                `sepia(${this.props.currState.filters.sepia}%)`
        };
        const canvasStyle = {...background, ...filters};
        return (
            <canvas className="work-canvas"
                    style={canvasStyle}
                    width={this.props.currState.image.dimensions.width}
                    height={this.props.currState.image.dimensions.height}
                    ref={this.state.canvasRef}
                    onMouseDown={(event) => {this.handleMouseDown(event)}}
                    onMouseMove={(event) => {this.handleMouseMove(event)}}
                    onMouseUp={() => {this.handleMouseUp()}}
                    onMouseLeave={() => {this.handleMouseUp()}}>
            </canvas>
        );
    }
}