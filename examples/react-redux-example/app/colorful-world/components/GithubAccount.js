import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class GithubAccount extends Component {

  render() {
    const {githubPath, user} = this.props;
    const {login, avatarUrl, name} = user;
    return (
      <div>
        <Link to={`/${githubPath}/${login}`}>
          <p>
            <img src={avatarUrl} width="72" height="72"/>
          </p>
          <h3>
            {login} {name && <span>({name})</span>}
          </h3>
        </Link>
      </div>
    );
  }
}

GithubAccount.propTypes = {
  githubPath: PropTypes.string,
  user: PropTypes.shape({
    login: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string
  }),
};

export default GithubAccount;