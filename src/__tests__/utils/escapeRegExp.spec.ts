import { escapeRegExp } from '../../utils';

describe('escape reg exp for string', () => {
  const template = '[[ _ ]]';

  it('escape specical characters for regex', () => {
    expect(escapeRegExp(template)).toEqual('\\[\\[ _ \\]\\]');
  });
});
