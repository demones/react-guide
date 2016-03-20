import React, {Component, PropTypes} from 'react';
import GithubRepoItem from './GithubRepoItem';
import GithubAccount from './GithubAccount';
import GithubRepoList from './GithubRepoList';

function loadData(props) {
  const {fullName} = props;
  props.loadRepo(fullName, ['description']);
  props.loadStargazers(fullName);
}

class GithubRepo extends Component {
  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadStargazers(this.props.fullName, true);
  }

  renderUser(user) {
    const {githubPath} = this.props;
    return (
      <GithubAccount user={user}
            key={user.login} githubPath={githubPath}/>
    );
  }

  render() {
    const {repo, owner, name} = this.props;
    if (!repo || !owner) {
      return <h1><i>Loading {name} details...</i></h1>;
    }

    const {stargazers, stargazersPagination, githubPath} = this.props;
    return (
      <div>
        <GithubRepoItem repo={repo}
              owner={owner} githubPath={githubPath}/>
        <hr />
        <GithubRepoList renderItem={this.renderUser}
              items={stargazers}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading stargazers of ${name}...`}
          {...stargazersPagination} />
      </div>
    );
  }
}

GithubRepo.propTypes = {
  repo: PropTypes.object,
  fullName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.object,
  stargazers: PropTypes.array.isRequired,
  stargazersPagination: PropTypes.object,
  loadRepo: PropTypes.func.isRequired,
  loadStargazers: PropTypes.func.isRequired,
  githubPath: PropTypes.string
};

export default GithubRepo;
