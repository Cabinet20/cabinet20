import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";

type AuthStore = {
  username?: string;
  isAuthenticated: boolean;
  error?: string;
};

const initialState: AuthStore = {
  isAuthenticated: false
}

export const AuthStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({username, isAuthenticated}) => ({
    username: computed(() => isAuthenticated() ? 'username' : 'Not logged in')
  })),
  withMethods((store) => ({
    setLoggedIn(): void {
      patchState(store, (state) => ({ isAuthenticated: true }))
    },
    logout(): void {
      patchState(store, (state) => ({ isAuthenticated: false }))
    }
  }))
);