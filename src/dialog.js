import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import { keyCode } from 'cat-util';

const SIZE = {
            'auto': 'auto',
            'large': 'lg',
            'medium': '',
            'small': 'sm'
        };

export default class Dialog extends Component {
    static propTypes = {
        show: React.PropTypes.bool,
        toBody: React.PropTypes.bool,
        mySize: React.PropTypes.string,
        title: React.PropTypes.string,
        noCloseButton: React.PropTypes.bool,
        buttons: React.PropTypes.array,
        noButtons: React.PropTypes.bool,
        autoClose: React.PropTypes.bool
    }

    static defaultProps = {
        show: false,
        toBody: true,
        mySize: 'medium',
        title: '标题',
        noCloseButton: false,
        buttons: [{
            name: '关闭'
        }],
        noButtons: false,
        autoClose: true
    }

    _handleClose(event) {
        if (event.target.className == 'modal fade in' && this.props.autoClose) {
            this.props.onClose();
        }
    }

    // 生成外部结构
    _getDialogContainer() {
        if (!this.dialogContainer) {
            this.dialogContainer = document.createElement('div');
            this.dialogContainer.className = 'my-dialog-container';
            document.body.appendChild(this.dialogContainer);
        }
        return this.dialogContainer;
    }

    // 清除节点
    _cleanDialogContainer() {
        React.unmountComponentAtNode(this._getDialogContainer());
        document.body.removeChild(this.dialogContainer);
        this.dialogContainer = null;
    }

    // 生成主要内容
    _renderDialog() {
        let { mySize, show, title, noCloseButton, onClose, buttons, noButtons } = this.props;

        return (
            <div className="modal-open">
                {
                    show &&
                    [
                        <div className="modal fade in" onClick={this::this._handleClose} key="body" style={{display: 'block'}}>
                            <div className={`modal-dialog modal-${SIZE[mySize]}`}>
                                <div className="modal-content">
                                    <Header
                                        title={title}
                                        noCloseButton={noCloseButton}
                                        onClose={onClose}
                                    />
                                    <div className="modal-body">
                                        {this.props.children}
                                    </div>
                                    { !noButtons && <Footer buttons={buttons} onClose={onClose} /> }
                                </div>
                            </div>
                        </div>,
                        <div className="modal-backdrop fade in" key="fade"/>
                    ]
                }
            </div>
        );
    }

    render() {
        if (this.props.show) {
            this.rendered = true;
        }
        return this.props.toBody ? null : (this.rendered ? this._renderDialog() : null);
    }

    // 如果追加到body后，每次Update后会更改render的目标节点
    componentDidUpdate() {
        if (this.props.toBody && this.rendered) {
            ReactDOM.render(this._renderDialog(), this._getDialogContainer());
        }
    }

    componentWillUnmount() {
        if (this.dialogContainer) {
            this._cleanDialogContainer();
        }
    }
}