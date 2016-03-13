import React, {Component, PropTypes} from 'react';

class PersonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      person: this.props.person
    };
  }

  render() {
    const {person} = this.state;
    return (
      <tr>
        <th>{person.id}</th>
        <td>{person.firstName}</td>
        <td>{person.lastName}</td>
        <td>{person.firstName + person.lastName}</td>
        <td className="link-group">
          <a>编辑</a>
          <a>取消</a>
          <a>保存</a>
          <a>删除</a>
        </td>
      </tr>
    );
  }
}

PersonItem.propTypes = {
  person: PropTypes.object
}

export default PersonItem;
