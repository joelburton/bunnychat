import React, { Component } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import ThreadNav from './ThreadNav';
import store from './store';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("huh?");
  }

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    console.log("render", this.props);
    const state = store.getState();
    const threads = state.threads;
    const threadId = this.props.match.params.threadId;
    const thread = threads.find(t => !threadId || (t.id === threadId));
    return (
      <div>
        <ThreadNav threads={threads} />
        <div className="well">
          <MessageList thread={thread} />
          <MessageInput threadId={threadId} />
        </div>
      </div>
    );
  }
}

export default App;