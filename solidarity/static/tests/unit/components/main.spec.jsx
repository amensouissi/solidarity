import React from 'react';
import renderer from 'react-test-renderer';

import { DumbMain } from '../../../js/app/components/main';

describe('Main component', () => {
  it('should render the main component', () => {
    const props = {
      data: { loading: false, comment: 'FooBar' }
    };
    const component = renderer.create(<DumbMain {...props} />);
    const result = component.toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render the main component (loading)', () => {
    const props = {
      data: { loading: true }
    };
    const component = renderer.create(<DumbMain {...props} />);
    const result = component.toJSON();
    expect(result).toMatchSnapshot();
  });
});