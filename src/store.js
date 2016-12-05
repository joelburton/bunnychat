import {createStore} from 'redux';
import uuid from 'uuid';

function messageReducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    const newMessage = { id: uuid.v4(), text: action.text, timestamp: Date.now() };
    const threads = state.threads.map(t =>
      t.id === action.threadId
        ? { ...t, messages: [...t.messages, newMessage] }
        : t);
    return { ...state, threads };
  }

  if (action.type === 'DELETE_MESSAGE') {
    const threads = state.threads.map(t =>
      t.id === action.threadId
        ? { ...t, messages: t.messages.filter(m => m.id !== action.id) }
        : t);
    return { ...state, threads }
  }

  if (action.type === "CHANGE_THREAD_SEARCH") {
    const threads = state.threads.map(t =>
      t.id === action.threadId
      ? { ...t, searchText: action.text}
      : t);
    return { ...state, threads };
  }

  return state;
}

const now = Date.now();

const aInitialMessages = [
  { id: "aa", text: "hello", timestamp: now-500000 },
  { id: "ab", text: "there", timestamp: now-200000 },
];

const bInitialMessages = [
  { id: "ba", text: "bhello", timestamp: now-500000 },
  { id: "bb", text: "bthere", timestamp: now-100000 },
];

const cInitialMessages = [
  { id: "ca", text: "chello", timestamp: now-50000000 },
  { id: "cb", text: "cthere", timestamp: now-40000000 },
];

const threads = [
  { id: "a", title: "Apple", messages: aInitialMessages, searchText: "" },
  { id: "b", title: "Berry", messages: bInitialMessages, searchText: "" },
  { id: "c", title: "Cherry", messages: cInitialMessages, searchText: "" },
];

const initialState = { threads: threads };

const store = createStore(messageReducer, initialState);

export default store;
export {messageReducer, createStore, initialState};