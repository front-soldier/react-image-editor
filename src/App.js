import React, { Component } from 'react';
import WorkAreaContainer from './WorkArea/WorkAreaContainer';
import ControlsContainer from "./WorkAreaControls/ControlsContainer";
import './App.css';

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
        const defFil = {...defaultFilters};
        const defActFil = {...defaultActiveFilter};
        const defCanvasState = {...defaultCanvasState};
        this.state = {
            image: {
                imageUrl: '',
                dimensions: {
                    width: '',
                    height: ''
                }
            },
            activeShape: {
                currentShape: '',
                shapeColor: '#df4b26',
                shapeSizeName: 'normal',
                shapeSizeValue: 5
            },
            canvasState: defCanvasState,
            activeFilter: defActFil,
            filters: defFil
        };
        this.history = [];
        this.history.push(JSON.parse(JSON.stringify(this.state)));
        this.historyPointer = this.history.length;
    }

    imageChanged = (image) => {
        const defFil = {...defaultFilters};
        const defActFil = {...defaultActiveFilter};
        const defCanvasState = {...defaultCanvasState};
        this.setState({
            image: image,
            filters: defFil,
            canvasState: defCanvasState,
            activeFilter: defActFil
        }, () => {
            this.addStory();
        });
    };

    currentShapeChanged = (shape) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeShape.currentShape = shape;
            return newState;
        }, () => {
            this.addStory();
        });
    };

    shapeColorChanged = (color) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeShape.shapeColor = color.hex;
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
            newState.activeShape.shapeSizeName = sizeName;
            newState.activeShape.shapeSizeValue = size;
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
    canvasStateChanged = (mouseX, mouseY, dragging, shapeColor, shapeSizeValue) => {
        this.setState((prevState) => {
            const newState = {...prevState};
            newState.canvasState.clickX.push(mouseX);
            newState.canvasState.clickY.push(mouseY);
            newState.canvasState.clickDrag.push(dragging);
            newState.canvasState.clickColor.push(shapeColor);
            newState.canvasState.clickSize.push(shapeSizeValue);
            return newState;
        });
    };
    addStory = () => {
        if (this.history.length >= 30) { // memory size
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
            return;
        }
    };

    render() {
        return (
            <div className='container'>
                <WorkAreaContainer currState={this.state}
                                   filters={this.state.filters}
                                   image={this.state.image}
                                   canvasState={this.state.canvasState}
                                   canvasStateChanged={this.canvasStateChanged}
                                   activeShape={this.state.activeShape}
                                   addStory={this.addStory}/>
                <ControlsContainer imageChanged={this.imageChanged}
                                   currentShapeChanged={this.currentShapeChanged}
                                   activeFilterChanged={this.activeFilterChanged}
                                   filterChanged={this.filterChanged}
                                   activeFilter={this.state.activeFilter}
                                   shapeColor={this.state.activeShape.shapeColor}
                                   shapeColorChanged={this.shapeColorChanged}
                                   shapeSizeName={this.state.activeShape.shapeSizeName}
                                   shapeSizeChanged={this.shapeSizeChanged}
                                   filters={this.state.filters}
                                   imageUrl={this.state.image.imageUrl}
                                   addStory={this.addStory}>
                    <div>
                        <div className={(this.historyPointer <= 1 ? 'disabled' : '')} onClick={this.undoState}>Undo</div>
                        <div className={(this.historyPointer >= this.history.length ? 'disabled' : '')} onClick={this.redoState}>Redo</div>
                    </div>
                </ControlsContainer>
            </div>
        );
    }
}

export default App;
