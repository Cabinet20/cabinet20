import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run cabinet20:serve:development',
        production: 'nx run cabinet20:serve:production',
      },
      ciWebServerCommand: 'nx run cabinet20:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
