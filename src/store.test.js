import { messageReducer, createStore } from './store';

describe('store', () => {
  let store;

  beforeEach(() => {
    store = createStore(messageReducer, {messages: []});
  });

  it('gets initial state', () => {
    expect(store.getState().messages).toEqual([]);
  });

  it('is side-effect free', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'hello'});
    store.dispatch({type: 'BAD_MESSAGE', text: 'hello'});
    expect(store.getState().messages).toEqual(['hello']);
  });

  it('can add msg', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'hello'});
    expect(store.getState().messages).toEqual(['hello']);
  });

  it('can add messages', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'hello'});
    store.dispatch({type: 'ADD_MESSAGE', text: 'world'});
    expect(store.getState().messages).toEqual(['hello', 'world']);
  });

  it('can delete message', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'hello'});
    store.dispatch({type: 'ADD_MESSAGE', text: 'there'});
    store.dispatch({type: 'ADD_MESSAGE', text: 'world'});
    store.dispatch({type: 'DELETE_MESSAGE', index: 1});
    expect(store.getState().messages).toEqual(['hello', 'world']);
  });

  it('calls subscribers', () => {
    const sub = jest.fn(() => {});
    expect(sub.mock.calls.length).toBe(0);
    store.subscribe(sub);
    store.dispatch({type: 'ADD_MESSAGE', text: 'hello'});
    expect(sub.mock.calls.length).toBe(1);
  })

});