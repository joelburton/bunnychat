import React, {Component} from 'react';
import store from './store';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {msg: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({msg: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.state.msg;
    store.dispatch({ type: "ADD_MESSAGE", text: text });
    this.setState({msg: ""});
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input type="text" className="form-control" value={this.state.msg} onChange={this.onChange} placeholder="Message..."/>
      </form>
    )
  }
}

export default MessageInput;