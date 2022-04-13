import { replaceKeywordForObjectParams } from '../../src/utils';

describe('replace keyword for object params', () => {
  const template = 'Hello :name {{ name }} ${{ name }}';

  test('replace param with : as prefix', () => {
    expect(
      replaceKeywordForObjectParams(
        template,
        {
          name: 'test',
        },
        {},
      ),
    ).toEqual('Hello test {{ name }} ${{ name }}');
  });

  test('replace param with pattern', () => {
    expect(
      replaceKeywordForObjectParams(
        template,
        {
          name: 'test',
        },
        {
          pattern: '{{ _ }}',
          specElement: '_',
        },
      ),
    ).toEqual('Hello :name test $test');
  });

  test('replace param with pattern and exclude pattern has template litterals as prefix', () => {
    expect(
      replaceKeywordForObjectParams(
        template,
        {
          name: 'test',
        },
        {
          pattern: '{{ _ }}',
          specElement: '_',
          templateLiterals: '$',
        },
      ),
    ).toEqual('Hello :name test {{ name }}');

    const otherTemplate = 'Hello :name ${{ name }} $${{ name }}';

    expect(
      replaceKeywordForObjectParams(
        otherTemplate,
        {
          name: 'test',
        },
        {
          pattern: '${{ _ }}',
          specElement: '_',
          templateLiterals: '$',
        },
      ),
    ).toEqual('Hello :name test ${{ name }}');
  });
});
