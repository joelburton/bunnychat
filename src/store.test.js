import { stateReducer, createStore, initialState } from './store';

describe('store', () => {
  let store;

  beforeEach(() => {
    store = createStore(stateReducer);
  });

  it('gets initial state', () => {
    expect(store.getState().threads.length).toEqual(3);
  });

  it('is side-effect free', () => {
    store.dispatch({type: 'BAD_MESSAGE', text: 'nope, not a good type'});
    const messages = store.getState().threads[0].messages;
    expect(messages.length).toBe(2);
  });

  it('can add message', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'zope', threadId: "a"});
    const messages = store.getState().threads[0].messages;
    expect(messages.length).toBe(3);
    expect(messages[2].text).toBe("zope");
  });

  it('can add messages', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'zope', threadId: "a"});
    store.dispatch({type: 'ADD_MESSAGE', text: 'pope', threadId: "a"});
    const messages = store.getState().threads[0].messages;
    expect(messages.length).toBe(4);
    expect(messages[2].text).toBe("zope");
    expect(messages[3].text).toBe("pope");
  });

  it('can delete message', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'zope', threadId: "a"});
    store.dispatch({type: 'ADD_MESSAGE', text: 'nope', threadId: "a"});
    store.dispatch({type: 'ADD_MESSAGE', text: 'pope', threadId: "a"});
    const id = store.getState().threads[0].messages[3].id;
    store.dispatch({type: 'DELETE_MESSAGE', id: id, threadId: "a"});
    const messages = store.getState().threads[0].messages;
    expect(messages.length).toBe(4);
    expect(messages[2].text).toBe('zope');
    expect(messages[3].text).toBe('pope');
  });

  it('calls subscribers', () => {
    const sub = jest.fn(() => {});
    expect(sub.mock.calls.length).toBe(0);
    store.subscribe(sub);
    store.dispatch({type: 'ADD_MESSAGE', text: 'hello', threadId: "a"});
    expect(sub.mock.calls.length).toBe(1);
  });

});