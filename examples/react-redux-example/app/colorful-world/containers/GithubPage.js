import {connect} from 'react-redux';
import Github from '../components/Github';
import {resetErrorMessage} from '../actions/github';

function mapStateToProps(state, ownProps) {
  const pathname = ownProps.location.pathname.substring(1);
  const paths = pathname.split('/');
  const index = pathname.indexOf('/');
  const githubPath = paths[0];
  const inputValue = index === -1 ? '' : pathname.substring(index + 1);

  return {
    githubPath,
    inputValue,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(Github);
