import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";

type AuthStore = {
  username: string;
  isAuthenticated: boolean;
  error?: string;
};

const initialState: AuthStore = {
  username: '',
  isAuthenticated: false
}

export const AuthStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store) => ({
    login(username: string): void {
      console.log('withMethods: ', username);
      patchState(store, (state) => ({isAuthenticated: true, username: username}))
    },
    logout(): void {
      patchState(store, (state) => ({isAuthenticated: false, username: ''}))
    }
  }))
);