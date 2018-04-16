import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Nav bar of threads  */

class ThreadNav extends Component {
  static propTypes = {
    threads: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    return (
      <ul className="nav nav-tabs">
        {this.props.threads.map(thread =>
          <li key={thread.id} role="presentation">
            <NavLink to={"/" + thread.id}>{thread.title}</NavLink>
          </li>
        )}
      </ul>
    );
  }
}

export default ThreadNav;
