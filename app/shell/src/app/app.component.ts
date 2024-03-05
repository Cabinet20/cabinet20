import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import {AuthStore} from "@cabinet20/shared/data-access";

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'c20-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  auth = inject(AuthStore);
  username = this.auth.username;
  isLoggedIn = this.auth.isAuthenticated;
  
  title = 'shell';
}
