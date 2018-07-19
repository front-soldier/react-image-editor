import React, {Component} from 'react';
import './DrawSizeComponent.css';

export default class DrawSizeComponent extends Component {
    sizeName = this.props.sizeName;
    propertyChange = () => {
        this.props.shapeSizeChanged(this.sizeName);
    };
    render() {
        return (
            <div className={'draw-item'}>
                <button className={'circle-button ' + this.sizeName + (this.props.shapeSizeName === this.sizeName ? ' active' : '')} onClick={this.propertyChange}/>
            </div>
        )
    }
}