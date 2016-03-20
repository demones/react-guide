import React, {Component, PropTypes} from 'react';

export default class GithubRepoList extends Component {
  renderLoadMore() {
    const {isFetching, onLoadMoreClick} = this.props;
    return (
      <button className="btn btn-link"
              onClick={onLoadMoreClick}
              disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    );
  }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel
    } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>;
    }

    const isLastPage = !nextPageUrl;
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>;
    }

    return (
      <div>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    );
  }
}

GithubRepoList.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string
};

GithubRepoList.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...'
};
