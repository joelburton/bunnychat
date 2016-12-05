import React, {Component} from 'react';
import store from './store';
import {shallow} from 'enzyme';
import ThreadSearchBox from './ThreadSearchBox';

jest.mock('./store');

const messages = [
  { id: "a", text: "hello", timestamp: 100 },
  { id: "b", text: "there", timestamp: 200 },
];

const thread = { 'id': 'a', title: 'Apple', messages: messages, searchText: "" };

describe("ThreadSearchBox", () => {
  afterEach(() => {
    store.dispatch.mockReset();
  });

  it('can render', () => {
    const render = shallow(<ThreadSearchBox thread={thread}/>);
    expect(render.containsMatchingElement(<input value=""/>)).toBeTruthy();
  });

  it('updates input', () => {
    store.dispatch.mockImplementation(action => (thread.searchText = action.text));

    let render = shallow(<ThreadSearchBox thread={thread}/>);
    render.simulate("change", { target: { value: "hello" } });
    expect(render.instance().props.thread.searchText).toBe("hello");
  });

  it('can search', () => {
    const render = shallow(<ThreadSearchBox thread={thread} />);
    render.simulate("change", { target: { value: "hello" } });
    expect(store.dispatch.mock.calls).toEqual([[{ text: "hello", type: "CHANGE_THREAD_SEARCH", id: "a" }]]);
  });
});