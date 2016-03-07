import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Person from '../components/Person';
import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    persons: state.persons
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
