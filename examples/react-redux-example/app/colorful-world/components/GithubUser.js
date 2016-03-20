import React, {Component, PropTypes} from 'react';
import zip from 'lodash/zip'
import GithubRepoList from './GithubRepoList';
import GithubRepoItem from './GithubRepoItem';
import GithubAccount from './GithubAccount';

function loadData(props) {
  const {login} = props;
  props.loadUser(login, ['name']);
  //获取 github 仓库，包括自己的和关注别人的仓库
  props.loadStarred(login);
}

export default class GithubUser extends Component {
  constructor(props) {
    super(props);
    this.renderRepo = this.renderRepo.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadStarred(this.props.login, true);
  }

  renderRepo([ repo, owner ]) {
    const {githubPath} = this.props;
    return (
      <GithubRepoItem repo={repo}
                      owner={owner}
                      key={repo.fullName} githubPath={githubPath}/>
    );
  }

  render() {
    const {user, login, githubPath, starredRepos, starredRepoOwners, starredPagination} = this.props;
    if (!user) {
      return (
        <div className="container">
          <h1><i>Loading {login}’s profile...</i></h1>
        </div>
      );
    }

    return (
      <div>
        <GithubAccount user={user} githubPath={githubPath}/>
        <hr />
        <GithubRepoList renderItem={this.renderRepo}
                        items={zip(starredRepos, starredRepoOwners)}
                        onLoadMoreClick={this.handleLoadMoreClick}
                        loadingLabel={`Loading ${login}’s starred...`}
          {...starredPagination} />
      </div>
    );
  }
}

GithubUser.propTypes = {
  login: PropTypes.string.isRequired,
  githubPath: PropTypes.string.isRequired,
  user: PropTypes.object,
  starredPagination: PropTypes.object,
  starredRepos: PropTypes.array.isRequired,
  starredRepoOwners: PropTypes.array.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadStarred: PropTypes.func.isRequired
};
