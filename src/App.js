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
            activeShape: '',
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

    activeShapeChanged = (shape) => {
        this.setState({
            activeShape: shape
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
                <WorkAreaContainer currState={this.state}></WorkAreaContainer>
                <ControlsContainer imageChanged={this.imageChanged}
                                   activeShapeChanged={this.activeShapeChanged}
                                   activeFilterChanged={this.activeFilterChanged}
                                   filterChanged={this.filterChanged}
                                   activeFilter={this.state.activeFilter}>
                </ControlsContainer>
            </div>
        );
    }
}

export default App;
