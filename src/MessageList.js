import React, { Component } from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import store from './store';
import ThreadSearchBox from './ThreadSearchBox';

/** MessageList: shows title, searchbox, and list of mesages. */

class MessageList extends Component {
  static propTypes = {
    thread: PropTypes.object,
  }

  handleDelete(id) {
    store.dispatch({
      type: "DELETE_MESSAGE",
      id: id,
      threadId: this.props.thread.id
    });
  }

  componentDidMount() {
    // Want to make sure momentJS relative times have a chance to update every 10secs
    this.timerId = setInterval(() => this.forceUpdate(), 10 * 1000);
  }

  componentWillUnmount() {
    // Would be an error to force update on unmounted component, so remove interval
    clearInterval(this.timerId);
  }

  render() {
    const thread = this.props.thread;
    const searchText = thread.searchText;
    const messages = searchText
      ? thread.messages.filter(msg => msg.text.includes(searchText))
      : thread.messages;

    return (
      <section className="thread">
        <h2>{thread.title}</h2>
        <p className="text-muted">Interesting conversation about {thread.title}.</p>
        <ThreadSearchBox thread={thread} />
        <ul className="list-group">
          {messages.map(msg =>
            <li
              key={msg.id}
              className="list-group-item"
              onClick={e => this.handleDelete(msg.id)} >
              <b>{msg.text}</b>
              <small className="text-muted pull-right">
                {distanceInWordsToNow(msg.timestamp)}
              </small>
            </li>
          )}
        </ul>
      </section>
    )
  }
}

export default MessageList;