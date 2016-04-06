import React, {Component} from 'react';
import PagelessScroll from '../ui/PageLessScroll'

let scrollPosition = 0;

function recordScrollPosition(newScrollPosition) {
  scrollPosition = newScrollPosition;
}

class PagelessScrollDemo extends Component {
  renderPagelessContent() {
    // return list of content
    const list = [1, 2, 4, 5, 6, 7, 8];
    return list.map((item) => {
      return (
        <div key={item}>
          {item}
        </div>
      );
    });
  }

  loadNextPage() {
    // fetch more results
  }

  render() {
    const hasMore = true;
    const itemStyle = {
      width: 400,
      height: 500,
      margin: 10
    };

    const style = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    return (
      <PagelessScroll
        style={style}
        itemStyle={itemStyle}
        onLoadMore={this.loadNextPage}
        moreToLoad={hasMore}
        onScroll={recordScrollPosition}
        initialScrollPosition={scrollPosition}
      >
        {this.renderPagelessContent()}
      </PagelessScroll>
    );
  }
}

export  default PagelessScrollDemo;