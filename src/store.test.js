import { messageReducer, createStore, initialState } from './store';

describe('store', () => {
  let store;

  beforeEach(() => {
    store = createStore(messageReducer, initialState);
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
    store.dispatch({type: 'ADD_MESSAGE', text: 'zope'});
    const messages = store.getState().threads[0].messages;
    expect(messages.length).toBe(3);
    expect(messages[2].text).toBe("zope");
  });

  it('can add messages', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'zope'});
    store.dispatch({type: 'ADD_MESSAGE', text: 'pope'});
    const messages = store.getState().threads[0].messages;
    expect(messages.length).toBe(4);
    expect(messages[2].text).toBe("zope");
    expect(messages[3].text).toBe("pope");
  });

  it('can delete message', () => {
    store.dispatch({type: 'ADD_MESSAGE', text: 'zope'});
    store.dispatch({type: 'ADD_MESSAGE', text: 'nope'});
    store.dispatch({type: 'ADD_MESSAGE', text: 'pope'});
    const id = store.getState().threads[0].messages[3].id;
    store.dispatch({type: 'DELETE_MESSAGE', id: id});
    const messages = store.getState().threads[0].messages;
    expect(messages.length).toBe(4);
    expect(messages[2].text).toBe('zope');
    expect(messages[3].text).toBe('pope');
  });

  it('calls subscribers', () => {
    const sub = jest.fn(() => {});
    expect(sub.mock.calls.length).toBe(0);
    store.subscribe(sub);
    store.dispatch({type: 'ADD_MESSAGE', text: 'hello'});
    expect(sub.mock.calls.length).toBe(1);
  });

  it('can change threads', () => {
    store.dispatch({type: 'CHANGE_THREAD', id: 'b'});
    expect(store.getState().currentThreadId).toBe('b');
  })

});