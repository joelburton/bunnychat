import React from 'react';
import { shallow } from 'enzyme';
import ThreadNav from './ThreadNav';
import { MemoryRouter as Router } from 'react-router-dom';

const threads = [{ id: 'a', title: 'Apple' }, { id: 'b', title: 'Berry' }];

describe("ThreadNav", () => {
  it('renders', () => {
    const rendered = shallow(<Router><ThreadNav threadId="a" threads={threads} /></Router>);
    expect(rendered.html()).toBe(
      '<ul class="nav nav-tabs">'
      + '<li role="presentation"><a class="active">Apple</a></li>'
      + '<li role="presentation"><a href="b">Berry</a></li></ul>'
    )
  });
});
