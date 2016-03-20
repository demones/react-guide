import {connect} from 'react-redux';
import {addPerson, editPerson, deletePerson, loadPerson} from '../actions/person';
import Person from '../components/Person';

function mapStateToProps(state) {
  return {
    persons: state.persons
  };
}

const mapDispatchToProps = {
  addPerson, 
  editPerson, 
  deletePerson, 
  loadPerson
};

// 也可以这样写
/*function mapDispatchToProps(dispatch) {
 return bindActionCreators({
   addPerson, 
   editPerson, 
   deletePerson, 
   loadPerson
 }, dispatch);
 }*/

/*function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators({
     addPerson, 
     editPerson, 
     deletePerson, 
     loadPerson
    }, dispatch),
    dispatch // 可不加，在组件中如果用到 dispatch，则设置，用不到不用设置
  }
}*/

//connect 第二个参数 mapDispatchToProps 也可以直接传入 action 包装的对象，内部会默认调用 bindActionCreators
export default connect(mapStateToProps, mapDispatchToProps)(Person);
