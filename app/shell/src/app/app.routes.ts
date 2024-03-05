import { Route } from '@angular/router';
import {NxWelcomeComponent} from "./nx-welcome.component";
import {loadRemoteModule} from "@angular-architects/native-federation";

export const appRoutes: Route[] = [
    {
        path: '',
        component: NxWelcomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'run',
        loadComponent: () =>
          loadRemoteModule('running', './Component').then(m => m.AppComponent),
    },
    {
        path: 'auth',
        loadChildren: () =>
          loadRemoteModule('auth', './routes').then(m => m.appRoutes),
    },
];
