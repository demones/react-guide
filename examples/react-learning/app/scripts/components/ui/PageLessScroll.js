import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as utils from './utils';

//参考地址
//https://github.com/greena13/react-pageless-scroll

const styles = {
  CONTAINER: {
    overflow: 'hidden',
    position: 'absolute'
  },

  LIST_ITEM: {
    position: 'absolute',
    display: 'inline-block'
  }
};

class PagelessScroll extends Component {
  constructor(props) {
    super(props);
    const {initialScrollPosition} = this.props;
    this.state = {
      scrollPosition: initialScrollPosition
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {initialScrollPosition} = newProps;
    if (initialScrollPosition !== this.props.initialScrollPosition) {
      this.setState({
        scrollPosition: initialScrollPosition
      });
    }
  }

  renderVisibleChildren() {
    const {children, itemStyle, style} = this.props;
    const {scrollPosition} = this.state;

    const itemHeight = utils.itemHeight(itemStyle);

    const rowsCount =
      utils.rowsThatFitIn({height: scrollPosition, rowHeight: itemHeight});

    const columnPositions = utils.columnPositions({style, itemStyle});
    const columnCount = columnPositions.length;

    const positions = utils.rowPositions({
      columnCount, rowsCount, scrollPosition, itemHeight, style
    });

    const positionsCount = positions.length;

    const firstVisiblePosition = rowsCount * columnCount;

    const visibleChildren =
      children.slice(firstVisiblePosition, firstVisiblePosition + positionsCount);

    const childrenStyleBase = Object.assign({}, styles.LIST_ITEM, itemStyle);

    return visibleChildren.map((child, index) => {
      const {top} = positions[index];
      const left = columnPositions[index % columnCount];

      const style = Object.assign({}, childrenStyleBase, {top, left});

      return (
        <div style={style} key={child.key}>
          {child}
        </div>
      );
    });
  }

  // Translation

  updateScrollPosition(event) {
    const {scrollPosition} = this.state;

    let newScrollPosition = scrollPosition + event.deltaY;

    const {children, itemStyle, style} = this.props;

    const columnPositions = utils.columnPositions({style, itemStyle});
    const rowsCount = Math.ceil(children.length / columnPositions.length);
    const totalRowsHeight = rowsCount * utils.itemHeight(itemStyle);

    if (newScrollPosition > 0) {

      const maxScrollPosition = totalRowsHeight - style.height;

      if (newScrollPosition > maxScrollPosition) {
        newScrollPosition = maxScrollPosition;
      }
    } else {
      newScrollPosition = 0;
    }

    if (scrollPosition !== newScrollPosition) {
      const {onScroll, loadThreshold, moreToLoad, onLoadMore} = this.props;

      onScroll(newScrollPosition);

      if (totalRowsHeight - (newScrollPosition + style.height) < loadThreshold && moreToLoad) {
        onLoadMore();
      }

      this.setState({
        scrollPosition: newScrollPosition
      });
    }
  }

  render() {
    const {style} = this.props;
    const containerStyle = Object.assign({}, style, styles.CONTAINER);
    return (
      <div style={containerStyle} onWheel={this.updateScrollPosition}>
        {this.renderVisibleChildren()}
      </div>
    );
  }
}


PagelessScroll.propTypes = {
  style: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired,
  itemStyle: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired
  }),
  moreToLoad: PropTypes.bool,
  onLoadMore: PropTypes.func,
  loadThreshold: PropTypes.number,
  initialScrollPosition: PropTypes.number,
  hideThreshold: PropTypes.number,
  onScroll: PropTypes.func,
  children: PropTypes.node
};

PagelessScroll.defaultProps = {
  initialScrollPosition: 0,
  hideThreshold: 100,
  moreToLoad: false,
  loadThreshold: 500,
  onScroll: () => {
  }
};

export default PagelessScroll;