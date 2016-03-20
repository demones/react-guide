import assign from 'lodash/assign';
import React, {Component, PropTypes} from 'react';

class PersonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      person: this.props.person
    };

    this.personDefault = assign({}, this.props.person);
  }

  handleEdit() {
    this.setState({
      editing: true
    });
  }

  handleCancel() {
    this.setState({
      editing: false,
      person: this.personDefault
    });
  }

  handleSave() {
    this.props.editPerson(this.state.person);
    this.setState({
      editing: false
    }, () => {
      this.personDefault = this.state.person;
    });
  }

  handleDelete(id) {
    this.props.deletePerson(id);
  }

  textOrInput(field, val) {
    const editing = this.state.editing;
    if (editing) {
      // 这里使用可控输入框组件
      return (
        <input type="text" value={val} onChange={this.handleChange.bind(this, field)}/>
      );
    }
    return (
      <span>{val}</span>
    );
  }

  handleChange(field, event) {
    const person = this.state.person;
    const val = event.target.value;
    person[field] = val;
    this.setState({
      person
    });
  }

  handleChangeCheck(event) {
    const person = this.state.person;
    person.completed = event.target.checked;
    this.setState({
      person
    });
  }

  render() {
    const {person, editing} = this.state;
    return (
      <tr>
        <th>
          <input type="checkbox" checked={person.completed}
                 onChange={this.handleChangeCheck.bind(this)}/>
        </th>
        <th>{person.id}</th>
        <td>{this.textOrInput('firstName', person.firstName)}</td>
        <td>{this.textOrInput('lastName', person.lastName)}</td>
        <td>{person.firstName + person.lastName}</td>
        <td>
          <a style={{display: !editing ? 'inline' : 'none'}} className="btn btn-link"
             onClick={this.handleEdit.bind(this)}>编辑</a>
          <a style={{display: editing ? 'inline' : 'none'}} className="btn btn-link"
             onClick={this.handleCancel.bind(this)}>取消</a>
          <a style={{display: editing ? 'inline' : 'none'}} className="btn btn-link"
             onClick={this.handleSave.bind(this)}>保存</a>
          <a className="btn btn-link"
             onClick={this.handleDelete.bind(this, person.id)}>删除</a>
        </td>
      </tr>
    );
  }
}
PersonItem.propTypes = {
  person: PropTypes.object.isRequired,
  editPerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
};

export default PersonItem;
