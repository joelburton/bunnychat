import React, {Component} from 'react';
import store from './store';
import {shallow} from 'enzyme';
import MessageInput from './MessageInput';

jest.mock('./store');

describe("MessageInput", () => {
  it('can render', () => {
    const render = shallow(<MessageInput />);
    expect(render.containsMatchingElement(<input value=""/>)).toBeTruthy();
  });

  it('updates input', () => {
    const render = shallow(<MessageInput />);
    render.find("input").at(0).simulate("change", { target: { value: "hello" } });
    expect(render.containsMatchingElement(<input value="hello"/>)).toBeTruthy();
  });

  it('can add', () => {
    const render = shallow(<MessageInput />);
    render.find("input").at(0).simulate("change", { target: { value: "hello" } });
    render.find("form").at(0).simulate("submit", { preventDefault: () => null });
    expect(store.dispatch.mock.calls).toEqual([[{ "text": "hello", "type": "ADD_MESSAGE" }]]);
    expect(render.containsMatchingElement(<input value=""/>)).toBeTruthy();
  });
});