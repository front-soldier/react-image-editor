import React, { Component } from 'react';
import WorkAreaContainerComponent from './Components/WorkAreaComponent/WorkAreaContainerComponent';
import ControlBarComponent from './Components/ControlBarComponent/ControlBarComponent';
import './App.css';
import 'normalize.css';
import TopBarComponent from "./Components/TopBarComponent/TopBarComponent";

const defaultFilters = {
    blur: '0',
    brightness: '100',
    contrast: '100',
    grayscale: '0',
    hueRotate: '0',
    invert: '0',
    opacity: '100',
    saturate: '100',
    sepia: '0'
};
const defaultActiveFilter = {
    currentFilter: '',
    filterValue: '',
};
const defaultCanvasState = {
    clickX: [],
    clickY: [],
    clickDrag: [],
    clickColor: [],
    clickSize: []
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                imageUrl: '',
                dimensions: {
                    width: '',
                    height: ''
                }
            },
            activeDraw: {
                drawColor: '#df4b26',
                shapeSizeName: 'normal',
                shapeSizeValue: 5
            },
            canvasState: {...defaultCanvasState},
            activeFilter: {...defaultActiveFilter},
            filters: {...defaultFilters},
            activeAction: '',
            cropper: {
                cropperRef: React.createRef(),
                height: 200,
                width: 200
            }
        };
        this.history = [];
        this.history.push(JSON.parse(JSON.stringify(this.state)));
        this.historyPointer = this.history.length;
    }

    imageChanged = (image) => {
        const defaultCanvasState = {
            clickX: [],
            clickY: [],
            clickDrag: [],
            clickColor: [],
            clickSize: []
        };
        this.setState({
            image: image,
            filters: {...defaultFilters},
            canvasState: {...defaultCanvasState},
            activeFilter: {...defaultActiveFilter}
        }, () => {
            this.addStory();
        });
    };

    drawColorChanged = (color) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeDraw.drawColor = color.hex;
            return newState;
        }, () => {
            this.addStory();
        });
    };

    shapeSizeChanged = (sizeName) => {
        let size;
        switch (sizeName) {
            case 'small' : size = 2; break;
            case 'normal' : size = 5; break;
            case 'large' : size = 10; break;
            case 'huge' : size = 15; break;
            default : break;
        }
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeDraw.shapeSizeName = sizeName;
            newState.activeDraw.shapeSizeValue = size;
            return newState;
        }, () => {
            this.addStory();
        });
    };

    activeFilterChanged = (filter) => {
        const activeFilter = {
            currentFilter: filter,
            filterValue: this.state.filters[filter]
        };
        this.setState({
           activeFilter: filter ? activeFilter : {...defaultActiveFilter}
        }, () => {
            this.addStory();
        });
    };

    filterChanged = (filter) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.filters[filter.type] = filter.value;
            newState.activeFilter.filterValue = filter.value;
            return newState;
        });
    };
    canvasStateChanged = (mouseX, mouseY, dragging, drawColor, shapeSizeValue) => {
        this.setState((prevState) => {
            const newState = {...prevState};
            newState.canvasState.clickX.push(mouseX);
            newState.canvasState.clickY.push(mouseY);
            newState.canvasState.clickDrag.push(dragging);
            newState.canvasState.clickColor.push(drawColor);
            newState.canvasState.clickSize.push(shapeSizeValue);
            return newState;
        });
    };
    addStory = () => {
        if (this.history.length >= 50) { // memory size
            this.history.shift();
        }
        this.history = this.history.slice(0, this.historyPointer);
        this.history.push(JSON.parse(JSON.stringify(this.state)));
        this.historyPointer++;
        this.forceUpdate();
    };
    undoState = () => {
        this.historyPointer--;
        if (this.history[this.historyPointer - 1] === undefined) {
            this.historyPointer++;
            return;
        }
        this.setState(JSON.parse(JSON.stringify(this.history[this.historyPointer - 1])));
    };
    redoState = () => {
        this.historyPointer++;
        if (this.history[this.historyPointer - 1] === undefined) {
            this.historyPointer--;
            return;
        }
        this.setState(JSON.parse(JSON.stringify(this.history[this.historyPointer - 1])));
    };

    componentDidMount() {
        document.onkeydown = this.keyDownHandler;
    }

    keyDownHandler = (ev) => {
        if (ev.keyCode === 90 && ev.ctrlKey && ev.shiftKey) {
            this.redoState();
            return;
        }
        if (ev.keyCode ===  90 && ev.ctrlKey) {
            this.undoState();
        }
    };
    activeActionChanged = (newAction) => {
        this.setState({
            activeAction: newAction
        }, () => {this.addStory()});
    };
    cropHandle = () => {
        const src = this.state.cropper.cropperRef.current.crop();
        const values = this.state.cropper.cropperRef.current.values();
        const image = {
            imageUrl: src,
            dimensions: {
                width: values.display.width,
                height: values.display.height
            }
        };
        this.imageChanged(image);
        this.activeActionChanged('');
    };
    cropperDimensionsChanged = (dimensions) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.cropper.height = +dimensions.height;
            newState.cropper.width = +dimensions.width;
            return newState;
        });
    };

    render() {
        return (
            <div className='root-container'>
                <TopBarComponent undoState={this.undoState}
                                 redoState={this.redoState}
                                 undoDisabled={(this.historyPointer <= 1)}
                                 redoDisabled={(this.historyPointer >= this.history.length)}
                                 cancelDisabled={this.state.image.imageUrl === ''}
                                 imageChanged={this.imageChanged}
                />
                <ControlBarComponent activeFilterChanged={this.activeFilterChanged}
                                     filterChanged={this.filterChanged}
                                     activeFilter={this.state.activeFilter}
                                     drawColor={this.state.activeDraw.drawColor}
                                     drawColorChanged={this.drawColorChanged}
                                     shapeSizeName={this.state.activeDraw.shapeSizeName}
                                     shapeSizeChanged={this.shapeSizeChanged}
                                     filters={this.state.filters}
                                     imageUrl={this.state.image.imageUrl}
                                     addStory={this.addStory}
                                     activeAction={this.state.activeAction}
                                     activeActionChanged={this.activeActionChanged}
                                     cropHandle={this.cropHandle}
                                     cropperHeight={this.state.cropper.height}
                                     cropperWidth={this.state.cropper.width}
                                     cropperDimensionsChanged={this.cropperDimensionsChanged}
                />
                <WorkAreaContainerComponent filters={this.state.filters}
                                            image={this.state.image}
                                            canvasState={this.state.canvasState}
                                            canvasStateChanged={this.canvasStateChanged}
                                            activeDraw={this.state.activeDraw}
                                            imageChanged={this.imageChanged}
                                            addStory={this.addStory}
                                            activeAction={this.state.activeAction}
                                            cropper={this.state.cropper}
                                            cropperDimensionsChanged={this.cropperDimensionsChanged}
                />
            </div>
        );
    }
}

export default App;
