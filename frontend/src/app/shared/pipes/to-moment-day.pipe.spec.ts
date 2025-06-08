import { ToMomentDayPipe } from './to-moment-day.pipe';

describe('ToMomentDayPipe', () => {
  it('create an instance', () => {
    const pipe = new ToMomentDayPipe();
    expect(pipe).toBeTruthy();
  });
});
