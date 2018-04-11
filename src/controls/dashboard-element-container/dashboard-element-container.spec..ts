import { render } from '@stencil/core/testing';
import { DashboardElementContainer } from './dashboard-element-container';

describe('dashboard-element-container', () => {
  it('should build', () => {
    expect(new DashboardElementContainer()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [DashboardElementContainer],
        html: '<dashboard-element-container></dashboard-element-container>'
      });
    });
  });
});