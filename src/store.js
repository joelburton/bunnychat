import {createStore} from 'redux';
import uuid from 'uuid';
import {combineReducers} from 'redux';

const now = Date.now();

const initialThreads = [
  {
    id: "a", title: "Apple", messages: [
    { id: "aa", text: "hello", timestamp: now - 500000 },
    { id: "ab", text: "there", timestamp: now - 200000 }],
  },
  {
    id: "b", title: "Berry", messages: [
    { id: "ba", text: "bhello", timestamp: now - 500000 },
    { id: "bb", text: "bthere", timestamp: now - 100000 }],
  },
  {
    id: "c", title: "Cherry", messages: [
    { id: "ca", text: "chello", timestamp: now - 50000000 },
    { id: "cb", text: "cthere", timestamp: now - 40000000 }]
  }];

const initialState = { threads: initialThreads };


function messages(messages = [], action) {
  if (action.type === 'ADD_MESSAGE') return [...messages, { id: uuid.v4(), text: action.text, timestamp: Date.now() }];
  if (action.type === 'DELETE_MESSAGE') return messages.filter(m => m.id !== action.id);
  else return messages;
}

function searchText(st = "", action) {
  if (action.type === 'CHANGE_THREAD_SEARCH') return action.text;
  else return st;
}

function title(title = "", action) {
  return title;
}

function id(id = "", action) {
  return id;
}

const thread = combineReducers({ messages, searchText, id, title, });

function threads(threads = initialThreads, action) {
  return threads.map(t => (t.id === action.threadId) ? thread(t, action) : t);
}

const stateReducer = combineReducers({ threads });


const store = createStore(stateReducer, {threads: initialThreads});

export default store;
export {stateReducer, createStore, initialState};