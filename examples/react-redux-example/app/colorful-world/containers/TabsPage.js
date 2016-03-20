import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchIntro} from '../actions/tabs';
import Tabs from '../components/Tabs';

function mapStateToProps(state) {
  return {
    tabs: state.tabs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tabAactions: bindActionCreators({
      fetchIntro
    }, dispatch),
    dispatch
  }
}

//connect 第二个参数 mapDispatchToProps 也可以直接传入 action 包装的对象，内部会默认调用 bindActionCreators
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
