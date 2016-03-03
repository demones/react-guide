import React, {Component, PropTypes} from 'react';
import '../styles/index.css';

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      forbid: false
    };
  }

  handleChange(field, event) {
    const val = event.target.value;
    //字面量定义对象，用 [] 括起来
    this.setState({
      [field]: val
    });
  }

  handleSave() {
    const {firstName, lastName} = this.state;
    this.props.filterSave({
      firstName,
      lastName
    });
    this.setState({
      firstName: '',
      lastName: ''
    });
  }

  handleChangeCheck (event) {
    const forbid = event.target.checked;
    this.setState({
      forbid
    });
    
    this.props.togglePerson(forbid);
  }

  render() {
    const {firstName, lastName} = this.state;
    return (
      <form className="form-inline">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={this.handleChange.bind(this, 'firstName')}
                 className="form-control"/>
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={this.handleChange.bind(this, 'lastName')}
                 className="form-control"/>
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-info" onClick={this.handleSave.bind(this)}>Save</button>
        </div>
        <input type="checkbox" checked={this.state.forbid}
               onChange={this.handleChangeCheck.bind(this)}/>
        禁止添加
      </form>
    );
  }
}

PersonForm.propTypes = {
  filterSave: PropTypes.func.isRequired,
  togglePerson: PropTypes.func.isRequired
};

export default PersonForm;
