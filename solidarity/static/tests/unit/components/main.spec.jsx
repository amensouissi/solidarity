import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import { DumbMain } from '../../../js/app/components/main';

describe('Main component', () => {
  it('should render the main component', () => {
    const pages = [{ id: '1', title: 'Foo', body: 'Foo body' }, { id: '2', title: 'Bar', body: 'Bar body' }];
    const props = {
      classes: {},
      data: { loading: false, pages: pages }
    };
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<DumbMain {...props} />);
    const rendered = shallowRenderer.getRenderOutput();
    expect(rendered).toMatchSnapshot();
  });
  it('should render the main component (loading)', () => {
    const props = {
      classes: {},
      data: { loading: true }
    };
    const component = renderer.create(<DumbMain {...props} />);
    const result = component.toJSON();
    expect(result).toMatchSnapshot();
  });
});