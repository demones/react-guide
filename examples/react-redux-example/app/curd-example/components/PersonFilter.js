import React, {Component, PropTypes} from 'react';

class PersonFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'all'
    };
  }

  statusDisplay(type) {
    const types = {
      all: '所有',
      completed: '已勾选',
      active: '未勾选'
    };

    if (this.state.status === type) {
      return (<span className="text-info">{types[type]}</span>);
    }
    return (
      <a href="" onClick={this.changeStatus.bind(this, type)}>{types[type]}</a>
    );
  }

  changeStatus(type, event) {
    event.preventDefault();
    const {showAll, showComplete, showActive} = this.props;
    if (type === 'all') {
      showAll('all');
    } else if (type === 'completed') {
      showComplete('completed');
    } else {
      showActive('active');
    }
    this.setState({
      status: type
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-3">
          {this.statusDisplay('all')}
        </div>
        <div className="col-lg-3">
          {this.statusDisplay('completed')}
        </div>
        <div className="col-lg-3">
          {this.statusDisplay('active')}
        </div>
      </div>
    );
  }
}

PersonFilter.propTypes = {
  showAll: PropTypes.func.isRequired,
  showComplete: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
};

export default PersonFilter;
