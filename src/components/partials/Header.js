import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import apiActions from '../../actions/apiActions';

class Header extends Component {
  componentDidMount() {
    if (this.props.users.currentUser == null) {
      this.props.currentUser();
    }
  }

  render() {
    const currentUser = this.props.users.currentUser || '';
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Ghost-Hunters
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Posts <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/map">
                Map
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item active">
              <Link className="nav-link" to={`/profile/${currentUser.id}`}>
                {currentUser.username}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const stateToProps = state => {
  return {
    users: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    currentUser: () => dispatch(apiActions.apiCurrentUser())
  };
};

export default connect(stateToProps, dispatchToProps)(Header);
