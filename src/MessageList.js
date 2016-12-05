import React, {Component} from 'react';
import store from './store';
import moment from 'moment';
import ThreadSearchBox from './ThreadSearchBox';

class MessageList extends Component {

  handleDelete(id) {
    store.dispatch({ type: "DELETE_MESSAGE", id: id, threadId: this.props.thread.id });
  }

  componentDidMount() {
    // Want to make sure momentJS relative times have a chance to update every 10secs
    this.timerId = setInterval(() => this.forceUpdate(), 10000);
  }

  componentWillUnmount() {
    // Would be an error to force update on unmounted component, so remove interval
    clearInterval(this.timerId);
  }

  render() {
    const thread = this.props.thread;
    const searchText = thread.searchText;
    const messages = thread.messages.filter(msg => (!searchText) || msg.text.indexOf(searchText) !== -1);
    return (
      <section className="thread">
        <h2>{ thread.title}</h2>
        <p className="text-muted">Interesting conversation about {thread.title}.</p>
        <ThreadSearchBox thread={thread} />
        <ul className="list-group">
          { messages.map(msg =>
            <li key={msg.id} className="list-group-item" onClick={e => this.handleDelete(msg.id)}>
              <b>{msg.text}</b>
              <small className="text-muted pull-right">{moment(msg.timestamp).fromNow()}</small>
            </li>
          )}
        </ul>
      </section>
    )
  }
}

export default MessageList;