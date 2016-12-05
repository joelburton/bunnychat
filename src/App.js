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
    const threads = state.threads;
    const threadId = this.props.params.threadId;
    const thread = threads.find(t => !threadId || (t.id === threadId));
    return (
      <div>
        <ThreadNav threads={threads}/>
        <div className="well">
          <MessageList thread={thread}/>
          <MessageInput/>
        </div>
      </div>
    );
  }
}


export function DefaultRoute(nextState, replace) {
  if (nextState.params.threadId === undefined) {
    const threads = store.getState().threads;
    replace("/" + threads[0].id);
  }
}

export default App;