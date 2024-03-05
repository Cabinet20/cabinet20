import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'c20-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display: block;">Cabinet 20 test</div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
