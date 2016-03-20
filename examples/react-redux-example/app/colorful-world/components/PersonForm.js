import React, {Component, PropTypes} from 'react';

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    };
  }

  addPerson() {
    const {addPerson} = this.props;
    const {firstName, lastName} = this.state;
    const person = {
      firstName,
      lastName
    };
    addPerson(person);
    this.setState({
      firstName: '',
      lastName: ''
    });
  }

  handleChange(field, event) {
    const val = event.target.value;
    this.setState({
      [field]: val
    });
  }

  render() {
    const {firstName, lastName} = this.state;
    return (
      <form className="form-inline">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" placeholder="First Name"
                 value={firstName} onChange={this.handleChange.bind(this, 'firstName')}/>
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" placeholder="Last Name"
                 value={lastName} onChange={this.handleChange.bind(this, 'lastName')}/>
        </div>
        <button type="button" className="btn btn-info" onClick={() => this.addPerson()}>Save</button>
      </form>
    );
  }
}

PersonForm.propTypes = {
  addPerson: PropTypes.func
}

export default PersonForm;
