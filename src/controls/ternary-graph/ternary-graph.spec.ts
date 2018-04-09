import { render } from '@stencil/core/testing';
import { TernaryGraph } from './ternary-graph';

describe('ternary-graph', () => {
  it('should build', () => {
    expect(new TernaryGraph()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [TernaryGraph],
        html: '<ternary-graph></ternary-graph>'
      });
    });
  });
});