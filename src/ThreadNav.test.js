import React from 'react';
import { shallow } from 'enzyme';
import ThreadNav from './ThreadNav';
import { StaticRouter as Router } from 'react-router-dom';

const threads = [{ id: 'a', title: 'Apple' }, { id: 'b', title: 'Berry' }];

describe("ThreadNav", () => {
  it('renders', () => {
    const rendered = shallow(
      <Router location="/a" context={{}}>
        <ThreadNav threads={threads} />
      </Router>
    );
    expect(rendered.html()).toBe(
      '<ul class="nav nav-tabs">'
      + '<li role="presentation"><a class="active" aria-current="true" href="/a">Apple</a></li>'
      + '<li role="presentation"><a aria-current="false" href="/b">Berry</a></li></ul>'
    )
  });
});
