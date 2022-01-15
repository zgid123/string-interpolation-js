import interpole from '../src';

describe('interpole string with params is array', () => {
  const template =
    'This function will :0 the string to become new :1 with :2 :3';

  test('without clear dirty param', () => {
    expect(
      interpole(template, ['interpole', 'string', 'params is array']),
    ).toEqual(
      'This function will interpole the string to become new string with params is array :3',
    );
  });

  test('with clear dirty param', () => {
    expect(
      interpole(template, ['interpole', 'string', 'params is array'], {
        clearDirtyParam: true,
      }),
    ).toEqual(
      'This function will interpole the string to become new string with params is array ',
    );
  });
});

describe('interpole string with params is object', () => {
  const template =
    'This function will :method the string to become new :name with :text :any';

  test('without clear dirty param', () => {
    expect(
      interpole(template, {
        name: 'string',
        method: 'interpole',
        text: 'params is array',
      }),
    ).toEqual(
      'This function will interpole the string to become new string with params is array :any',
    );
  });

  test('with clear dirty param', () => {
    expect(
      interpole(
        template,
        {
          name: 'string',
          method: 'interpole',
          text: 'params is array',
        },
        {
          clearDirtyParam: true,
        },
      ),
    ).toEqual(
      'This function will interpole the string to become new string with params is array ',
    );
  });

  test('keyword appears multiple times', () => {
    expect(
      interpole(
        'The word :word appears multiple times. Here :word, and here :word.',
        {
          word: 'text',
        },
        {
          clearDirtyParam: true,
        },
      ),
    ).toEqual(
      'The word text appears multiple times. Here text, and here text.',
    );
  });
});

describe('interpole string with custom pattern', () => {
  const template = 'Hello {{ name }}, are you a {{ job }}?';
  const template2 = 'Hello [[ name ]], are you a [[ job ]]?';
  const template3 = 'Hello {{  name    }}, are you a {{     job   }}?';
  const result = 'Hello Alpha, are you a developer?';

  test('pattern is a string', () => {
    expect(
      interpole(
        template,
        {
          name: 'Alpha',
          job: 'developer',
        },
        {
          exactMatch: true,
          specElement: '_',
          pattern: '{{ _ }}',
        },
      ),
    ).toEqual(result);

    expect(
      interpole(
        template3,
        {
          name: 'Alpha',
          job: 'developer',
        },
        {
          exactMatch: true,
          specElement: '_',
          pattern: '{{ _ }}',
        },
      ),
    ).not.toEqual(result);

    expect(
      interpole(
        template3,
        {
          name: 'Alpha',
          job: 'developer',
        },
        {
          exactMatch: true,
          specElement: '###',
          pattern: '{{ ### }}',
        },
      ),
    ).not.toEqual(result);

    expect(
      interpole(
        template2,
        {
          name: 'Alpha',
          job: 'developer',
        },
        {
          exactMatch: true,
          specElement: '_',
          pattern: '[[ _ ]]',
        },
      ),
    ).toEqual(result);
  });

  test('pattern is a regex pattern', () => {
    expect(
      interpole(
        template,
        {
          name: 'Alpha',
          job: 'developer',
        },
        {
          pattern: /{{ \w* }}/,
        },
      ),
    ).toEqual(result);
  });

  test('pattern is a string and exactMatch is false', () => {
    expect(
      interpole(
        template,
        {
          name: 'Alpha',
          job: 'developer',
        },
        {
          specElement: '_',
          pattern: '{{ _ }}',
        },
      ),
    ).toEqual(result);

    expect(
      interpole(
        template3,
        {
          name: 'Alpha',
          job: 'developer',
        },
        {
          specElement: '_',
          pattern: '{{ _ }}',
        },
      ),
    ).toEqual(result);
  });
});

describe('interpole string with nested object params', () => {
  const template = 'Hello {{ user.name }}, are you a {{ user.job.name }}?';
  const result = 'Hello Alpha, are you a developer?';

  test('pattern is a string', () => {
    expect(
      interpole(
        template,
        {
          user: {
            name: 'Alpha',
            job: {
              name: 'developer',
            },
          },
        },
        {
          exactMatch: true,
          specElement: '_',
          pattern: '{{ _ }}',
        },
      ),
    ).toEqual(result);
  });

  test('pattern is a string and exactMatch is false', () => {
    expect(
      interpole(
        template,
        {
          user: {
            name: 'Alpha',
            job: {
              name: 'developer',
            },
          },
        },
        {
          specElement: '_',
          pattern: '{{ _ }}',
        },
      ),
    ).toEqual(result);
  });
});
