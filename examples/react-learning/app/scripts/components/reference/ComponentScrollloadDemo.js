
import React, {Component} from 'react';
import ComponentScrollload from '../ui/ComponentScrollload'

class ComponentScrollloadDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hasMore: true
    };
    this.loadMore.bind(this);
  }
  
  renderPagelessContent() {
    // return list of content
    const list = [1, 2, 4, 5, 6, 7, 8];
    return list.map((item) => {
      return (
        <div key={item} style={{height: '200px'}}>
          {item}
        </div>
      );
    });
  }

  loadMore() {
    // fetch more results
  }

  render() {

    return (
    <ComponentScrollload className="via transferPropsTo"
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
                isLoading={this.state.loading}
                loader={<div className="loading"><img src="/img/loading.svg" /></div>}>
      {this.renderPagelessContent()}
    </ComponentScrollload>
    );
  }
}

export default ComponentScrollloadDemo;
