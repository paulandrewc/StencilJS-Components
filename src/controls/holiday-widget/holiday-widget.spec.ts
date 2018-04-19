import { render } from '@stencil/core/testing';
import { HolidayWidget } from './holiday-widget';

describe('holiday-widget', () => {
  it('should build', () => {
    expect(new HolidayWidget()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [HolidayWidget],
        html: '<holiday-widget></holiday-widget>'
      });
    });
  });
});