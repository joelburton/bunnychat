import React from 'react';
import {shallow} from 'enzyme';
import MessageList from './MessageList';
import store from './store';

jest.mock("./store");

const messages = [
  { id: "a", text: "hello", timestamp: 100 },
  { id: "b", text: "there", timestamp: 200 },
];

const thread = { 'id': 'a', title: 'Apple', messages: messages, searchText: "" };


describe('MessageList', () => {
  it('shows messages', () => {
    const rendered = shallow(<MessageList thread={thread}/>);
    const lis = rendered.find("li");
    expect(lis.length).toBe(2);
    expect(lis.at(0).find("b").text()).toBe("hello");
    expect(lis.at(1).find("b").text()).toBe("there");
  });

  it('deletes messages', () => {
    const rendered = shallow(<MessageList thread={thread}/>);
    const there = rendered.find("li").at(1);
    there.simulate("click");
    expect(store.dispatch.mock.calls).toEqual([[{ type: 'DELETE_MESSAGE', id: "b" }]]);
  });

  describe('Filtering', () => {
    it('handles filtering', () => {
      thread.searchText = "hello";
      const rendered = shallow(<MessageList thread={thread}/>);
      const lis = rendered.find("li");
      expect(lis.length).toBe(1);
      expect(lis.at(0).find("b").text()).toBe("hello");
    });

    it('handles filtering to empty list', () => {
      thread.searchText = "xxx-not-there-xxx";
      const rendered = shallow(<MessageList thread={thread}/>);
      const lis = rendered.find("li");
      expect(lis.length).toBe(0);
    });

    it('handles clearing filtering', () => {
      thread.searchText = "xxx-not-there-xxx";
      let rendered = shallow(<MessageList thread={thread}/>);
      thread.searchText = "";
      rendered = shallow(<MessageList thread={thread}/>);
      const lis = rendered.find("li");
      expect(lis.length).toBe(2);
      expect(lis.at(0).find("b").text()).toBe("hello");
    });

  })


});