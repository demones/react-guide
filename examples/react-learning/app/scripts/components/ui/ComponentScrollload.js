import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import documentOffset from 'document-offset';

//参考
// https://github.com/nrako/react-component-scrollload
class ComponentScrollload extends Component {
  constructor(props) {
    super(props);
    this.disablePointerTimeout = null;
  }

  componentDidMount() {
    this.listenScroll();

    // About setTimeout: fluxxor enforce flux principle; dispatching an action during and action would trigger an error
    //setTimeout(this.onScroll);
  }

  componentWillReceiveProps(nextProps) {
    // if there is no need to listen on scroll anymore
    if (nextProps.hasMore) {
      this.listenScroll();
    } else if (this.props.disablePointer <= 0) {
      this.unlistenScroll();
    }
  }

  componentDidUpdate() {
    // when component update need to check if loaded children height are bigger than threshold else load more
    // About setTimeout: fluxxor enforce flux principle; dispatching an action during and action would trigger an error
    setTimeout(this.onScroll);
  }

  componentWillUnmount() {
    this.unlistenScroll();
  }

  onScroll() {
    if (this.props.disablePointer > 0) {
      this.disablePointer();
    }

    if (!this.props.hasMore || this.props.isLoading) {
      return;
    }

    const el = ReactDOM.findDOMNode(this);
    const currentScroll = this.props.useDocument ?
    document.body.scrollTop + documentOffset(el).top : el.scrollTop + el.offsetHeight;

    if (currentScroll + this.props.threshold < el.scrollHeight) {
      return;
    }

    this.props.loadMore();
  }

  disablePointer() {
    if (this.disablePointerTimeout === null) {
      this.refs.wrapper.classList.add(this.props.disablePointerClass);
    }

    clearTimeout(this.disablePointerTimeout);
    this.disablePointerTimeout = setTimeout(this.removeDisablePointerClass, this.props.disablePointer);
  }

  removeDisablePointerClass() {
    if (this.refs.wrapper) {
      this.refs.wrapper.classList.remove(this.props.disablePointerClass);
    }

    this.disablePointerTimeout = null;
  }


  listenScroll() {
    const el = this.props.useDocument ? window : ReactDOM.findDOMNode(this);

    el.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onScroll);
  }

  unlistenScroll() {
    const el = this.props.useDocument ? window : ReactDOM.findDOMNode(this);

    el.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }

  render() {
    return (
      React.createElement('div', this.props,
        React.createElement('div', {ref: 'wrapper'},
          this.props.children
        ),
        this.props.isLoading && this.props.loader
      )
    );
  }

}


ComponentScrollload.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  useDocument: PropTypes.bool,
  threshold: PropTypes.number,
  loader: PropTypes.element,
  disablePointer: PropTypes.number,
  disablePointerClass: PropTypes.string,
  children: PropTypes.node
};

ComponentScrollload.defaultProps = {
  threshold: 1000,
  loader: React.createElement('div', null, 'Loading...'),
  disablePointer: 0,
  disablePointerClass: 'disable-pointer'
};

export default ComponentScrollload;