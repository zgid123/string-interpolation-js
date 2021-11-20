import { escapeRegExp } from '../../src/utils';

describe('escape reg exp for string', () => {
  const template = '[[ _ ]]';

  test('escape specical characters for regex', () => {
    expect(
      escapeRegExp(template),
    ).toEqual('\\[\\[ _ \\]\\]');
  });
});
