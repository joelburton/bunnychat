import createStore from './flux';

function messageReducer(state, action) {
  if (action.type === "ADD_MESSAGE") {
    return {messages: [...state.messages, action.text]};
  } else if (action.type === "DELETE_MESSAGE") {
    return {messages: [...state.messages.slice(0, action.index), ...state.messages.slice(action.index + 1)]};
  } else {
    return state;
  }
}

const store = createStore(messageReducer, { messages: ["hey", "jude"] });

export default store;
export { messageReducer, createStore };