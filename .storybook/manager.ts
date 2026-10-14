import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'NicaSource Design System V2',
    brandUrl: 'https://github.com/Bayardo88/NS-DS-SF',
  }),
});
