import React, {Component} from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import ThreadNav from './ThreadNav';
import './App.css';
import store from './store';

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    console.log("render");
    const state = store.getState();
    const threads= state.threads;
    const thread = threads.find(t => t.id === state.currentThreadId);
    return (
      <div>
        <ThreadNav threads={threads} />
        <div className="well">
          <MessageList thread={thread}/>
          <MessageInput/>
        </div>
      </div>
    );
  }
}

export default App;