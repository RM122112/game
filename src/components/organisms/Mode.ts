import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import type { App } from 'vue';

export function configurePrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.my-app-dark',
      },
    },
  });
}