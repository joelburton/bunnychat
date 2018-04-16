import React, { Component } from 'react';
import store from './store';
import PropTypes from 'prop-types';

/** Simple search box: records search text in store. */

class ThreadSearchBox extends Component {
  static propTypes = {
    thread: PropTypes.object,
  }

  handleChange = (e) => {
    store.dispatch({
      type: 'CHANGE_THREAD_SEARCH',
      threadId: this.props.thread.id,
      text: e.target.value
    });
  }

  render() {
    return (
      <input type="text"
        className="search-box"
        placeholder="Search..."
        value={this.props.thread.searchText || ""}
        onChange={this.handleChange} />
    );
  }
}

export default ThreadSearchBox;
