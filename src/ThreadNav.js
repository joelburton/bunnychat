import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Nav bar of threads  */

class ThreadNav extends Component {
  static propTypes = {
    threads: PropTypes.arrayOf(PropTypes.object),
    threadId: PropTypes.string,
  }

  render() {
    return (
      <ul className="nav nav-tabs">
        {this.props.threads.map(thread =>
          <li key={thread.id} role="presentation">
            {this.props.threadId !== thread.id
              ? <Link to={thread.id}>{thread.title}</Link>
              : <a className="active">{thread.title}</a>}
          </li>
        )}
      </ul>
    );
  }
}

export default ThreadNav;
