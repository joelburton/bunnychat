import React, {Component} from 'react';
import store from './store';

class ThreadNav extends Component {

  handleClick(id) {
    store.dispatch({ type: 'CHANGE_THREAD', id: id });
  }

  render() {
    return (
      <ul className="nav nav-tabs">
        { this.props.threads.map(thread =>
          <li key={thread.id} role="presentation" className={ thread.active && "active"}>
            <a onClick={e => this.handleClick(thread.id)} href="#">{thread.title}</a>
          </li>
        )}
      </ul>
    );
  }
}

export default ThreadNav;
