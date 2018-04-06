import { render } from '@stencil/core/testing';
import { SdiTriangle } from './sdi-triangle';

describe('sdi-triangle', () => {
  it('should build', () => {
    expect(new SdiTriangle()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [SdiTriangle],
        html: '<sdi-triangle></sdi-triangle>'
      });
    });
  });
});