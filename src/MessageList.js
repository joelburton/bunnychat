import React, {Component} from 'react';
import store from './store';

class MessageList extends Component {

  handleDelete(idx) {
    store.dispatch({type: "DELETE_MESSAGE", index: idx});
  }

  render() {
    return (
      <ul className="list-group">
        { this.props.messages.map((message, i) =>
          <li key={i} className="list-group-item" onClick={ e => this.handleDelete(i) }>
            { message }
          </li>
        )}
      </ul>
    )
  }
}

export default MessageList;