import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {AuthStore} from "@cabinet20/shared/data-access";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), AuthStore],
};
