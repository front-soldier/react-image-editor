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

class App extends Component {
    constructor(props) {
        super(props);
        const defFil = {...defaultFilters};
        this.history = [];
        this.historyPointer = this.history.length;
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
            canvasState: {
                clickX: [],
                clickY: [],
                clickDrag: [],
                clickColor: [],
                clickSize: [],
            },
            activeFilter: {
                currentFilter: '',
                filterValue: ''
            },
            filters: defFil
        };
    }

    imageChanged = (image) => {
        const defFil = JSON.parse(JSON.stringify(defaultFilters));
        this.setState({
            image: image,
            filters: defFil,
            activeFilter: {
                currentFilter: '',
                filterValue: ''
            },
        }, () => {
            this.addToHistory();
        });
    };

    currentShapeChanged = (shape) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeShape.currentShape = shape;
            return newState;
        }, () => {
            this.addToHistory();
        });
    };

    shapeColorChanged = (color) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeShape.shapeColor = color.hex;
            return newState;
        }, () => {
            this.addToHistory();
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
        };
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeShape.shapeSizeName = sizeName;
            newState.activeShape.shapeSizeValue = size;
            return newState;
        }, () => {
            this.addToHistory();
        });
    };

    activeFilterChanged = (filter) => {
        this.setState({
           activeFilter: {
               currentFilter: filter,
               filterValue: this.state.filters[filter]
           }
        }, () => {
            this.addToHistory();
        });
    };

    filterChanged = (filter) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.filters[filter.type] = filter.value;
            newState.activeFilter.filterValue = filter.value;
            return newState;
        }, () => {
            this.addToHistory();
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
        }, () => {
            this.addToHistoryDrawing();
        });
    };
    addToHistory() {
        this.addStory();
    };
    addToHistoryDrawing() {
        const clickDrag = this.state.canvasState.clickDrag;
        if (clickDrag[clickDrag.length-2] && !clickDrag[clickDrag.length-1]) // Check if the line was finished to draw
        {
            this.addStory();
        }
    }
    addStory() {
        if (this.history.length >= 20) {
            this.history.shift();
        }
        this.history = this.history.slice(0, this.historyPointer);
        this.history.push(JSON.parse(JSON.stringify(this.state)));
        this.historyPointer++;
        console.log(this.history);
    }
    undoState = () => {
        this.historyPointer--;
        this.setState(this.history[this.historyPointer - 1]);
    };
    redoState = () => {
        this.historyPointer++;
        this.setState(this.history[this.historyPointer - 1]);
    };

    render() {
        return (
            <div className='container'>
                <WorkAreaContainer currState={this.state}
                                   filters={this.state.filters}
                                   image={this.state.image}
                                   canvasState={this.state.canvasState}
                                   canvasStateChanged={this.canvasStateChanged}
                                   activeShape={this.state.activeShape}/>
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
                                   undoState={this.undoState}
                                   redoState={this.redoState}/>
            </div>
        );
    }
}

export default App;
