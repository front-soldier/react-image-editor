import React, { PureComponent } from 'react';


export default class HistoryTravelComponent extends PureComponent {
    render() {
        const {
            image,
            handler,
            disabled,
            classes
        } = this.props;
        return (
            <img className={'button ' + classes + (disabled ? ' disabled' : '')} src={image} onClick={handler} alt={''}/>
        )
    }
}