import React, {Component} from 'react';
import store from './store';

class ThreadSearchBox extends Component {

  handleChange(e) {
    store.dispatch({
      type: 'CHANGE_THREAD_SEARCH',
      threadId: this.props.thread.id,
      text: e.target.value
    });
  }

  render() {
    const text = this.props.thread.searchText;
    return (
      <input className="search-box" placeholder="Search..." value={text} onChange={e => this.handleChange(e)}/>
    );
  }
}

export default ThreadSearchBox;
