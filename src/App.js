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
        const defFil = JSON.parse(JSON.stringify(defaultFilters));
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
        });
    };

    currentShapeChanged = (shape) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeShape.currentShape = shape;
            return newState;
        });
    };

    shapeColorChanged = (color) => {
        this.setState((prevState) => {
            const newState =  {...prevState};
            newState.activeShape.shapeColor = color.hex;
            return newState;
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
        });
    };

    activeFilterChanged = (filter) => {
        this.setState({
           activeFilter: {
               currentFilter: filter,
               filterValue: this.state.filters[filter]
           }
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

    render() {
        return (
            <div className='container'>
                <WorkAreaContainer currState={this.state}
                                   activeShape={this.state.activeShape}/>
                <ControlsContainer imageChanged={this.imageChanged}
                                   currentShapeChanged={this.currentShapeChanged}
                                   activeFilterChanged={this.activeFilterChanged}
                                   filterChanged={this.filterChanged}
                                   activeFilter={this.state.activeFilter}
                                   shapeColor={this.state.activeShape.shapeColor}
                                   shapeColorChanged={this.shapeColorChanged}
                                   shapeSizeName={this.state.activeShape.shapeSizeName}
                                   shapeSizeChanged={this.shapeSizeChanged}/>
            </div>
        );
    }
}

export default App;
