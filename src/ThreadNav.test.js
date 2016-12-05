import React from 'react';
import {shallow} from 'enzyme';
import ThreadNav from './ThreadNav';

const threads = [{ id: 'a', title: 'Apple' }, { id: 'b', title: 'Berry' }];

describe("ThreadNav", () => {
  it('renders', () => {
    const rendered = shallow(<ThreadNav threads={threads}/>);
    expect(rendered.html()).toBe('<ul class="nav nav-tabs"><li role="presentation"><a>Apple</a></li><li role="presentation"><a>Berry</a></li></ul>')
  });
});
