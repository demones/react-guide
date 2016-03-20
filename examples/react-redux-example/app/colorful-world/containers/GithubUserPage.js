import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadUser, loadStarred} from '../actions/github';
import GithubUser from '../components/GithubUser';

function mapStateToProps(state, ownProps) {
  const {login} = ownProps.params;
  // 注意这种写法，相当于从 state 中取 pagination，再取 starredByUser
  // 以下写法定义了 三个变量 starredByUser users 和 repos
  const {
    pagination: { starredByUser },
    entities: {users, repos}
  } = state;

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map(id => repos[id]);
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner]);

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login]
  };
}

export default connect(mapStateToProps, {
  loadUser,
  loadStarred
})(GithubUser);
