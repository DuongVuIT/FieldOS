/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  expect(renderer!.root.findByProps({children: 'FieldOS'})).toBeTruthy();
  expect(
    renderer!.root.findByProps({children: 'Mobile Engineering Lab'}),
  ).toBeTruthy();
});
