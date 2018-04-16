import React, { Component } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import ThreadNav from './ThreadNav';
import store from './store';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const threads = store.getState().threads;
    return (
      <div>
        <ThreadNav threads={threads} />
        <div className="well">
          <MessageList thread={this.props.thread} />
          <MessageInput threadId={this.props.thread.threadId} />
        </div>
      </div>
    );
  }
}

export default App;