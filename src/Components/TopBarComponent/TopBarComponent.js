import React, { PureComponent } from 'react';
import './TopBarComponent.css';

import logoImg from './camera.png';
import undoImg from './undo.png';
import redoImg from './redo.png';
import cancelImg from './cancel.png';

import HistoryTravelComponent from './HistoryTravelComponent/HistoryTravelComponent'

export default class TopBarComponent extends PureComponent {
    render() {
        const {
            undoState,
            redoState,
            undoDisabled,
            redoDisabled,
            cancelDisabled,
            imageChanged
        } = this.props;

        const emptyImage = {
            imageUrl: '',
            dimensions: {
                width: '',
                height: ''
            }
        };

        return (
            <div className={'topbar'}>
                <a className={'topbar-logo'} href={""}>
                    <img src={logoImg} className={'topbar-image'} alt={''}/>
                    <span className={'topbar-title'}>Photo Editor</span>
                </a>
                <div className={'topbar-button-container'}>
                    <HistoryTravelComponent
                        classes={'undo-button'}
                        image={undoImg}
                        handler={undoState}
                        disabled={undoDisabled}/>
                    <HistoryTravelComponent
                        classes={'redo-button'}
                        image={redoImg}
                        handler={redoState}
                        disabled={redoDisabled}/>
                    <HistoryTravelComponent
                        classes={'cancel-button'}
                        image={cancelImg}
                        handler={() => {imageChanged(emptyImage)}}
                        disabled={cancelDisabled}/>
                </div>
            </div>
        )
    }
}