import React, {Component} from 'react';
import { Link } from 'react-router';

class ThreadNav extends Component {

  render() {
    return (
      <ul className="nav nav-tabs">
        { this.props.threads.map(thread =>
          <li key={thread.id} role="presentation">
            <Link to={"/" + thread.id} activeClassName="active">{thread.title}</Link>
          </li>
        )}
      </ul>
    );
  }
}

export default ThreadNav;
