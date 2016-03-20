import {connect} from 'react-redux';
import {loadRepo, loadStargazers} from '../actions/github';
import GithubRepo from '../components/GithubRepo';

function mapStateToProps(state, ownProps) {
  const {login, name} = ownProps.params;
  const {
    pagination: {stargazersByRepo},
    entities: {users, repos}
  } = state;

  const fullName = `${login}/${name}`;
  const stargazersPagination = stargazersByRepo[fullName] || {ids: []};
  const stargazers = stargazersPagination.ids.map(id => users[id]);

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login]
  };
}

export default connect(mapStateToProps, {
  loadRepo,
  loadStargazers
})(GithubRepo);
