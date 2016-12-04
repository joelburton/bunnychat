import React from 'react';
import {shallow} from 'enzyme';
import MessageList from './MessageList';
import store from './store';

jest.mock("./store");

describe('MessageList', () => {
  it('shows messages', () => {
    const rendered = shallow(<MessageList messages={['hello', 'there']}/>);
    expect(rendered.html()).toBe(
      '<ul class="list-group"><li class="list-group-item">hello</li><li class="list-group-item">there</li></ul>');
  });

  it('deletes messages', () => {
    const rendered = shallow(<MessageList messages={['hello', 'there']}/>);
    const there = rendered.find("li").at(1);
    there.simulate("click");
    expect(store.dispatch.mock.calls).toEqual([[{ type: 'DELETE_MESSAGE', index: 1 }]]);
  });
});