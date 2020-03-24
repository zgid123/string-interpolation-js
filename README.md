# Introduction

Simple package to format string template to a new string that is replaced all params with provided variables.

## Installation

    $ npm install string-interpolation-js

## Usage

### With array value

```js
import interpole from 'string-interpolation-js';

const source = 'This function can :0 this template with :1 value';

console.log(interpole(source, ['format', 'array'])); // This function can format this template with array value
```

### With object value

```js
import interpole from 'string-interpolation-js';

const source = 'This function can :method this template with :type value';

console.log(
  interpole(source, {
    type: 'object',
    method: 'format',
  }),
); // This function can format this template with object value
```

What happens if your template has params more than the value you provided?

```js
import interpole from 'string-interpolation-js';

const source = 'This function can :0 this template with :1 value';

console.log(interpole(source, ['format'])); // This function can format this template with :1 value

const source = 'This function can :method this template with :type value';

console.log(
  interpole(source, {
    method: 'format',
  }),
); // This function can format this template with :type value
```

If you want to remove those redundant params, use this option

```js
import interpole from 'string-interpolation-js';

const source = 'This function can :0 this template with :1 value';

console.log(interpole(source, ['format'], { clearDirtyParam: true })); // This function can format this template with  value

const source = 'This function can :method this template with :type value';

console.log(
  interpole(source, {
    method: 'format',
  }, {
    clearDirtyParam: true,
  }),
); // This function can format this template with  value
```
