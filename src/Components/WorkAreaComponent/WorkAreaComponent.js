import React, { Component } from 'react';
import { Cropper } from 'react-image-cropper';

export default class WorkAreaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(),
            context: {},
            paint: false,
            cropperRef: React.createRef(),
            cropperSrc: ''
        };
    }
    componentDidMount() {
        this.setState({
            context: this.state.canvasRef.current.getContext('2d')
        });
    }
    addClick = (mouseX, mouseY, dragging) => {
        this.props.canvasStateChanged(mouseX, mouseY, dragging, this.props.activeDraw.drawColor, this.props.activeDraw.shapeSizeValue);
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
    calcCropImage = () => {
        const {
            filters,
        } = this.props;
        const result = document.createElement('canvas');
        const canvas = this.state.canvasRef.current;
        result.width = canvas.width;
        result.height = canvas.height;
        const context = result.getContext('2d');
        context.filter = `blur(${filters.blur}px) `
            + `brightness(${filters.brightness}%) `
            + `contrast(${filters.contrast}%) `
            + `grayscale(${filters.grayscale}%) `
            + `hue-rotate(${filters.hueRotate}deg) `
            + `invert(${filters.invert}%) `
            + `opacity(${filters.opacity}%) `
            + `saturate(${filters.saturate}%) `
            + `sepia(${filters.sepia}%)`;
        const image = new Image();
        image.onload = () => {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
            this.setState({
                cropperSrc: result.toDataURL()
            });
        };
        image.src = this.props.image.imageUrl;
    };
    componentDidUpdate() {
        this.redraw();
        if (this.props.activeAction === "crop" && !this.state.cropperSrc) {
            this.calcCropImage();
        }
        if (this.props.activeAction !== "crop") {
            this.state.cropperSrc = '';
        }
    }
    cropperDimensionsHandler = (values) => {
        this.props.cropperDimensionsChanged({
            height: values.display.height,
            width: values.display.width
        });
    };
    render() {
        const { filters, image, activeAction} = this.props;
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
            <div>
                <canvas className={'work-canvas ' + (activeAction === "crop" ? 'canvas-off' : '')}
                    style={canvasStyle}
                    width={image.dimensions.width}
                    height={image.dimensions.height}
                    ref={this.state.canvasRef}
                    onMouseDown={(event) => {this.handleMouseDown(event)}}
                    onMouseMove={(event) => {this.handleMouseMove(event)}}
                    onMouseUp={(event) => {this.handleMouseUp(event)}}
                    onMouseLeave={(event) => {this.handleMouseLeave(event)}}>
                </canvas>
                {(activeAction === "crop" && this.state.cropperSrc) ? (
                    <Cropper
                        src={this.state.cropperSrc}
                        ref={this.props.cropper.cropperRef}
                        fixedRatio={false}
                        width={this.props.cropper.width}
                        height={this.props.cropper.height}
                        onChange={this.cropperDimensionsHandler}
                    />
                ) : ( null
                )}
            </div>
        );
    }
}