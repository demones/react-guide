import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class GithubRepoItem extends Component {

  render() {
    const {repo, owner, githubPath} = this.props;
    const {login} = owner;
    const {name, description} = repo;

    return (
      <div className="Repo">
        <h3>
          <Link to={`/${githubPath}/${login}/${name}`}>
            {name}
          </Link>
          {' by '}
          <Link to={`/${githubPath}/${login}`}>
            {login}
          </Link>
        </h3>
        {description &&
        <p>{description}</p>
        }
      </div>
    );
  }
}

GithubRepoItem.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired
  }).isRequired,
  githubPath: PropTypes.string
};
