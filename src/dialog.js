import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import { keyCode } from 'rs-util';

const SIZE = {
            'auto': 'auto',
            'large': 'lg',
            'medium': '',
            'small': 'sm'
        };

export default class Dialog extends Component {
    static propTypes = {
        className: React.PropTypes.string,
        show: React.PropTypes.bool,
        toBody: React.PropTypes.bool,
        mySize: React.PropTypes.string,
        title: React.PropTypes.string,
        noCloseButton: React.PropTypes.bool,
        buttons: React.PropTypes.array,
        noButtons: React.PropTypes.bool,
        autoClose: React.PropTypes.bool,
    }

    static defaultProps = {
        className: '',
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

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(event) {
        if (event.target.className == 'modal fade in' && this.props.autoClose) {
            this.props.onClose();
        }
    }

    // 生成外部结构
    getDialogContainer() {
        if (!this.dialogContainer) {
            this.dialogContainer = document.createElement('div');
            this.dialogContainer.className = 'my-dialog-container';
            document.body.appendChild(this.dialogContainer);
        }
        return this.dialogContainer;
    }

    // 清除节点
    cleanDialogContainer() {
        React.unmountComponentAtNode(this.getDialogContainer());
        document.body.removeChild(this.dialogContainer);
        this.dialogContainer = null;
    }

    // 生成主要内容
    renderDialog() {
        let { className, mySize, show, title, noCloseButton, onClose, buttons, noButtons } = this.props;

        return (
            <div className={`modal-open ${className}`}>
                {
                    show &&
                    [
                        <div className="modal fade in" onClick={this.handleClose} key="body" style={{display: 'block'}}>
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

        return !this.props.toBody && this.rendered && this.renderDialog();
    }

    // 如果追加到body后，每次Update后会更改render的目标节点
    componentDidUpdate() {
        if (this.props.toBody && this.rendered) {
            ReactDOM.render(this.renderDialog(), this.getDialogContainer());
        }
    }

    componentWillUnmount() {
        if (this.dialogContainer) {
            this.cleanDialogContainer();
        }
    }
}
