import {Component, inject} from '@angular/core';
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

  loginForm = this.fb.group({
                              username: new FormControl('', {validators: [Validators.required]}),
                              password: new FormControl('', {})
                            });

  constructor() {
    this.loginForm.valueChanges.subscribe(output => console.log(output))
  }
  
  login() {
    this.auth.setLoggedIn();
  }
}
