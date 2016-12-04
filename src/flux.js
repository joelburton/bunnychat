function createStore(reducer, initialState) {
    let state = initialState;
    const listeners = [];

    function getState() {
      return state;
    }

    function dispatch(action) {
      state = reducer(state, action);
      listeners.forEach(l => l());
    }

    function subscribe(fn) {
      listeners.push(fn);
    }

    return {
      getState,
      dispatch,
      subscribe,
    }
}

export default createStore;
