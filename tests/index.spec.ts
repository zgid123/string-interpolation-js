import interpole from '../src';

describe('interpole string with params is array', () => {
  const template = 'This function will :0 the string to become new :1 with :2 :3';

  test('without clear dirty param', () => {

    expect(
      interpole(template, ['interpole', 'string', 'params is array']),
    ).toEqual('This function will interpole the string to become new string with params is array :3');
  });

  test('with clear dirty param', () => {
    expect(
      interpole(template, ['interpole', 'string', 'params is array'], { clearDirtyParam: true }),
    ).toEqual('This function will interpole the string to become new string with params is array ');
  });
});

describe('interpole string with params is object', () => {
  const template = 'This function will :method the string to become new :name with :text :any';

  test('without clear dirty param', () => {

    expect(
      interpole(template, {
        name: 'string',
        method: 'interpole',
        text: 'params is array',
      }),
    ).toEqual('This function will interpole the string to become new string with params is array :any');
  });

  test('with clear dirty param', () => {
    expect(
      interpole(template, {
        name: 'string',
        method: 'interpole',
        text: 'params is array',
      }, {
        clearDirtyParam: true,
      }),
    ).toEqual('This function will interpole the string to become new string with params is array ');
  });
});
