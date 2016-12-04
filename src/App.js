import React, {Component} from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import './App.css';
import store from './store';

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const messages = store.getState().messages;
    return (
      <div>
        <MessageList messages={messages}/>
        <MessageInput/>
      </div>
    );
  }
}

export default App;