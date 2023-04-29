import interpole from '../src/index';

interface IUserProps {
  email: string;
  displayName: string;
}

const template = '{{ user.displayName }} just joined the chat.';

interpole<{ user: IUserProps }>(
  template,
  {
    user: {
      email: 'test',
      displayName: 'test',
    },
  },
  {
    exactMatch: true,
    specElement: '_',
    pattern: '{{ _ }}',
  },
);
