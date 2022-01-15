import { clearDirtyParam } from '../../src/utils';

describe('clear dirty param for string', () => {
  const template = 'This function will clear dirty :3 param for string';

  test('clear dirty param', () => {
    expect(clearDirtyParam(template)).toEqual(
      'This function will clear dirty  param for string',
    );
  });
});
