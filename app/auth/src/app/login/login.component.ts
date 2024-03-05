import {Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthStore} from "@cabinet20/shared/data-access";

@Component({
             selector: 'cabinet20-login',
             standalone: true,
             imports: [CommonModule, ReactiveFormsModule],
             templateUrl: './login.component.html',
             styleUrl: './login.component.scss',
           })
export class LoginComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthStore);
  isLoggedIn = this.auth.isAuthenticated;
  username = this.auth.username;

  loginForm = this.fb.group({
                              username: new FormControl('', {validators: [Validators.required]}),
                              password: new FormControl('', {})
                            });

  constructor() {
    effect(() => {
      console.log('Username: ', this.username!())
    });
  }
  
  login() {
    const newUser = this.loginForm.get('username') ? this.loginForm.get('username')!.value! : 'No user';
    this.auth.login(newUser);
    this.loginForm.reset();
  }
  
  logout() {
    this.auth.logout();
  }
}
