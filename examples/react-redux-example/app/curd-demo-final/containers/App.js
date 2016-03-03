import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import curdActions from '../actions';
import Person from '../components/Person';

// 这里 state.persons 应该跟 combineReducers 中对应
function mapStateToProps(state) {
  return {
    persons: state.persons,
    tabs: state.tabs
  };
}

function mapDispatchToProps(dispatch) {
  //return bindActionCreators(curdActions, dispatch);
  return {
    actions: bindActionCreators(curdActions, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
