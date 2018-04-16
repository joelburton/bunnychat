import React, { Component } from 'react';
import store from './store';
import PropTypes from 'prop-types';

/** Input for new messages.
 * 
 * Local state: content of message (before submitted)
 */

class MessageInput extends Component {
  state = { msg: "" };

  static propTypes = {
    threadId: PropTypes.string,
  }

  onChange = (e) => {
    this.setState({ msg: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch({
      type: "ADD_MESSAGE",
      text: this.state.msg,
      threadId: this.props.threadId
    });
    this.setState({ msg: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="form-control"
          value={this.state.msg}
          onChange={this.onChange}
          placeholder="Message..."
        />
      </form>
    )
  }
}

export default MessageInput;