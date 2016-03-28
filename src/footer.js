import React, {Component} from 'react';

export default class Footer extends Component {
    static propTypes = {
        buttons: React.PropTypes.array,
        onClose: React.PropTypes.func
    }
    static defaultProps = {
        buttons: [{
            name: '关闭'
        }]
    }
    // TODO: 需要解决一个问题，dialog的提交按钮怎样获取内部的信息
    // 可能在实际使用中，可以在外部回调中使用全局的一些参数

    render() {
        let { buttons, onClose } = this.props;

        return (
            <div className="modal-footer">
                {
                    buttons.map((item, index) => {
                        let handleClick = item.onClick ? item.onClick : onClose;

                        return (
                            <button
                                className={`btn btn-${item.myStyle ? item.myStyle : 'default'}`}
                                onClick={handleClick}
                                key={index}
                            >
                                {item.name}
                            </button>        
                        );
                    })
                }
            </div>
        );
    }
}
